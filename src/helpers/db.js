import { db } from "../services/firebase";
import youtube from "../services/youtube";
import { baseTerms } from "../services/youtube";

export function readChats() {
  let abc = [];
  db.ref("chats").on("value", snapshot => {
    snapshot.forEach(snap => {
      abc.push(snap.val())
    });
    return abc;
  });
}

export function writeChats(message) {
  return db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid
  });
}

export function addSong(request) {
    return db.ref("queue").push({
        title: request.title,
        videoId: request.videoId,
    });
}

export async function searchVideo(searchTerm) {
    const response = await youtube.get("/search", {
        params: {
            ...baseTerms,
            q: searchTerm,
        },
    });
    console.log(response.data.items);
    return {
        title: response.data.items[0].snippet.title,
        videoId: response.data.items[0].id.videoId,
    }
}

export function updateIndex(index) {
    db.ref("index").set(index);
}