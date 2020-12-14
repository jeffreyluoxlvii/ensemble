import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { addSong, pauseSongDb, playSongDb, searchVideo, updateIndex } from "../../helpers/db";
import { auth } from "../../services/firebase";
import { db } from "../../services/firebase";
import ReactPlayer from 'react-player/youtube';
import styles from './Play.module.css';

export default class Play extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      queue: [],
      playerVolume: 0.26,
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
    this.scrollToBottom();

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
      db.ref("isPlaying").on("value", snapshot => {
        const val = snapshot.val();
        this.setState({ isPlaying: val });
        this.setState({ loadingPlayState: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingPlayState: false });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
    if (index <= this.state.songIndex && this.state.songIndex > 0) {
      this.setState({
        songIndex: this.state.songIndex - 1
      }, () => updateIndex(this.state.songIndex));
    }
    await db.ref("queue/" + id).remove();
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
    if (e.keyCode === 13 && e.shiftKey === false && /\S/.test(this.state.content)) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div>
        <main className="container-fluid d-flex h-100 flex-column">
          <Header />
          <div className="row main-container flex-fill">
            <div className="col-3 main-instructions-column">
              <h4 className={styles.titleBox}>Current Queue: </h4>
              <div className={styles.scroll}>
                <div className={styles.textBox}>
                  <ol>
                    {this.state.queue.map((song, i) => {
                      return (<li className={(this.state.songIndex === i ? "highlighted" : "")}  key={i}>
                        <div className={styles.flexBox}><div onClick={() => updateIndex(i)}>{song.title}</div>
                        <div className={styles.removeButton} ><i  class="fas fa-times" onClick={() => this.removeSong(song.id, i)}></i></div>
                        </div>
                      </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>
            <div className="col-6 main-instructions-column">
              <div className="center">
                {(() => {
                  if (this.state.loadingIndex || this.state.loadingQueue || this.state.queue.length === 0) {
                    return null
                  } else if (this.state.songIndex === this.state.queue.length){
                    return <ReactPlayer
                              volume={this.state.playerVolume}
                              onEnded={this.playNextSong}
                              onReady={this.playSong}
                              onPlay={this.playSong}
                              onPause={this.pauseSong}
                              playing={this.state.isPlaying}
                              className="videoFormat"
                              url={`https://youtu.be/${this.state.queue[this.state.queue.length - 1].videoId}`}
                            />
                  } else {
                    return <ReactPlayer
                              volume={this.state.playerVolume}
                              onEnded={this.playNextSong}
                              onReady={this.playSong}
                              onPlay={this.playSong}
                              onPause={this.pauseSong}
                              playing={this.state.isPlaying}
                              className="videoFormat"
                              url={`https://youtu.be/${this.state.queue[this.state.songIndex].videoId}`}
                            />
                  }
                })()}
                <div className="buttonList">
                  <button className="buttonPadding2" onClick={this.playPrevSong} type="button">
                    <i class="fas fa-step-backward"></i>
                  </button>
                  {
                    (this.state.isPlaying) ?
                      <button className={styles.buttonPadding} onClick={this.pauseSong} type="button">
                        <i class="fas fa-pause"></i>
                      </button> :
                      <button className={styles.buttonPadding} onClick={this.playSong} type="button">
                        <i class="fas fa-play"></i>
                      </button>
                  }
                  <button className={styles.buttonPadding2} onClick={this.playNextSong} type="button">
                    <i class="fas fa-step-forward"></i>
                  </button>
                </div>
                <div className={styles.slider}>
                <div className={styles.soundIconLeft}><i class="fas fa-volume-off"></i></div>
                <input type="range" min="0" max="1" step="0.01" onChange={this.setVolume} value={this.state.playerVolume} className={styles.range}/>
                 <div className={styles.soundIconRight}><i class="fas fa-volume-up"></i></div>
                </div>
              </div>
            </div>
            <div className="col-3 main-command-column">
              <div className={styles.chatArea} ref={this.myRef}>
                {/* loading indicator */}
                {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div> : ""}
                {/* chat area */}
                {this.state.chats.map(chat => {
                  return <p key={chat.timestamp} className={(this.state.user.email === chat.uid ? styles.chatBubble : styles.chatBubbleCurrentUser)}>
                    {chat.content}
                    <br />
                    <span className={styles.chatTime}>{chat.uid}</span>
                  </p>
                })}
                <div style={{ float: "left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </div>
              <div className={styles.form}>
                <form onSubmit={this.handleSubmit} className="mx-3">
                  <textarea className="border border-color w-100 rounded" name="content" rows="2" onKeyDown={this.onEnterPress} onChange={this.handleChange} value={this.state.content} placeholder="Type your message here! Type '-p [songname]' to queue a song."></textarea>
                  {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                  <button type="submit" className={styles.sendButton}>Send</button>
                </form>
              </div>
              <div className={styles.logIn}>
                Logged in as: <strong className={styles.text2}>{this.state.user.email}</strong>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}