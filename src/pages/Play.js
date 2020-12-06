import React, { Component } from "react";
import Header from "../components/Header";
import { addSong, searchVideo } from "../helpers/db";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Play extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      videos: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this._isMounted = true;
    this.setState({ readError: null, loadingChats: true });
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      addSong(searchVideo(this.state.content));
      console.log(searchVideo(this.state.content));
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div>
      <main className="container-fluid d-flex h-100 flex-column">
        <Header/>
        <div className="row main-container flex-fill">
        <div className="col-9 main-instructions-column">
          {/*
          To be filled out with music player content
          */}
        </div>
        <div className="col-3 main-command-column">
          <div className="chat-area" ref={this.myRef}>
            {/* loading indicator */}
            {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div> : ""}
            {/* chat area */}
            {this.state.chats.map(chat => {
              return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                {chat.content}
                <br />
                <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
              </p>
            })}
          </div>
          <form onSubmit={this.handleSubmit} className="mx-3">
            <textarea className="border border-color w-100 rounded" name="content" rows="2" onChange={this.handleChange} value={this.state.content}></textarea>
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button type="submit" className="btn btn-submit w-100 px-5 mt-4">Play</button>
          </form>
          <div className="py-5 mx-3">
            Login in as: <strong className="text-info">{this.state.user.email}</strong>
          </div>
        </div>
        </div>
      </main>
      </div>
    );
  }
}