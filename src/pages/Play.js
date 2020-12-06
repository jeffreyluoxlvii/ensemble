import React, { Component } from "react";
import Header from "../components/Header";
import { addSong, pauseSongDb, playSongDb, searchVideo, updateIndex } from "../helpers/db";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import ReactPlayer from 'react-player/youtube';

export default class Play extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      queue: [],
      playerVolume: 0.5,
      content: '',
      readError: null,
      writeError: null,
      isPlaying: true,
      loadingQueue: true,
      loadingChats: true,
      loadingIndex: true,
      loadingPlayState: true,
      songIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.playNextSong = this.playNextSong.bind(this);
    this.playPrevSong = this.playPrevSong.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true, loadingQueue: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
    // fetch the queue
    try {
      db.ref("queue").on("value", snapshot => {
        let queue = [];
        snapshot.forEach((snap) => {
          let data = snap.val();
          queue.push({
            videoId: data.videoId,
            title: data.title,
            id: snap.key,
          });
        });
        this.setState({ queue });
        this.setState({ loadingQueue: false });
      })
    } catch (error) {
      this.setState({ readError: error.message, loadingQueue: false });
    }
    try {
      db.ref("index").on("value", snapshot => {
        const index = snapshot.val();
        this.setState({ songIndex: index });
        this.setState({ loadingIndex: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingIndex: false });
    }
    try {
      db.ref("isPlaying").on("value", snapshot => {
        const val = snapshot.val();
        this.setState({ isPlaying: val });
        this.setState({ loadingPlayState: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingPlayState: false });
    }
  }

  setVolume(event) {
    this.setState({
      playerVolume: event.target.valueAsNumber
    })
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  pauseSong() {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false,
      });
      pauseSongDb();
    }
  }

  playSong() {
    if (!this.state.isPlaying) {
      this.setState({
        isPlaying: true,
      });
      playSongDb();
    }
  }

  playNextSong() {
    if (this.state.songIndex + 1 < this.state.queue.length) {
      this.setState({
        songIndex: this.state.songIndex + 1,
      }, () => updateIndex(this.state.songIndex));
    }
  }

  playPrevSong() {
    if (this.state.songIndex - 1 >= 0) {
      this.setState({
        songIndex: this.state.songIndex - 1,
      }, () => updateIndex(this.state.songIndex));
    }
  }

  async removeSong(id, index) {
    if(index <= this.state.songIndex && this.state.songIndex > 0) {
      this.setState({
        songIndex: this.state.songIndex - 1
      }, () => updateIndex(this.state.songIndex));
    }
    db.ref("queue/" + id).remove();
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.email
      });
      if (this.state.content.startsWith("-p ")) {
        addSong(await searchVideo(this.state.content.substring(3)));
      }
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <div>
        <main className="container-fluid d-flex h-100 flex-column">
          <Header />
          <div className="row main-container flex-fill">
            <div className="col-3 main-instructions-column">
              <h4 className="titleBox">Current Queue: </h4>
              <div className="scroll">
                <div className="textBox">
                  <ol>
                    {this.state.queue.map((song, i) => {
                      return <li className={(this.state.songIndex === i ? "highlighted" : "")} key={i} onClick={() => this.removeSong(song.id, i)}>{song.title}</li>
                    })}
                  </ol>
                </div>
              </div>
            </div>
            <div className="col-6 main-instructions-column">
              <div className="center">
                {(this.state.loadingIndex || this.state.loadingQueue || this.state.queue.length === 0) ? null :
                  <ReactPlayer  
                    volume={this.state.playerVolume}
                    onEnded={this.playNextSong}
                    onReady={this.playSong}
                    onPlay={this.playSong}
                    onPause={this.pauseSong}
                    playing={this.state.isPlaying}
                    className="videoFormat"
                    url={`https://youtu.be/${this.state.queue[this.state.songIndex].videoId}`}
                  />}

                <div className="buttonList">
                  <button className="buttonPadding2" onClick={this.playPrevSong} type="button">
                  <i class="fas fa-step-backward"></i>
                  </button>
                  {
                    (this.state.isPlaying) ?
                      <button className="buttonPadding" onClick={this.pauseSong} type="button">
                        <i class="fas fa-pause"></i>
                      </button> :
                      <button className="buttonPadding" onClick={this.playSong} type="button">
                        <i class="fas fa-play"></i>
                      </button>
                  }
                  <button className="buttonPadding2" onClick={this.playNextSong} type="button">
                  <i class="fas fa-step-forward"></i>
                  </button>
                </div>
                <div className="slider">
                <input type="range" min="0" max="1" step="0.02" onChange={this.setVolume} value={this.state.playerVolume} class="range blue"/>
                </div>
              </div>
            </div>
            <div className="col-3 main-command-column">
              <div className="chat-area" ref={this.myRef}>
                {/* loading indicator */}
                {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div> : ""}
                {/* chat area */}
                {this.state.chats.map(chat => {
                  return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.email === chat.uid ? "current-user" : "")}>
                    {chat.content}
                    <br />
                    <span className="chat-time float-right">{chat.uid}</span>
                  </p>
                })}
              </div>
              <div className="form">
                <form onSubmit={this.handleSubmit} className="mx-3">
                  <textarea className="border border-color w-100 rounded" name="content" rows="2" onKeyDown={this.onEnterPress} onChange={this.handleChange} value={this.state.content}></textarea>
                  {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                  <button type="submit" className="sendButton">Send</button>
                </form>
              </div>
              <div className="logIn">
                Logged in as: <strong className="text2">{this.state.user.email}</strong>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}