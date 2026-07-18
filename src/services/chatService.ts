import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
} from '@react-native-firebase/database';
import { auth, db } from '../config/firebase';

import {
  collection,
  doc,
  getDoc,
  getDocs,
} from '@react-native-firebase/firestore';

export const getMatches = async () => {
  const currentUid = auth.currentUser?.uid;

  if (!currentUid) {
    return [];
  }

  const snapshot = await getDocs(
    collection(db, 'matches'),
  );

  const matches = await Promise.all(
    snapshot.docs
      .filter(doc =>
        doc.data().users.includes(currentUid),
      )
      .map(async docSnap => {
        const data = docSnap.data();

        const otherUserId = data.users.find(
          (id: string) => id !== currentUid,
        );

        const otherUserDoc = await getDoc(
          doc(db, 'users', otherUserId),
        );

        return {
          id: docSnap.id,
          ...data,
          user: otherUserDoc.data(),
        };
      }),
  );

  return matches;
};


// realtime database for sending and store message


export const sendMessage = async (
  matchId: string,
  text: string,
) => {
  const currentUser = auth.currentUser;

  if (!currentUser || !text.trim()) {
    return;
  }

  const messagesRef = ref(
    realtimeDb,
    `chats/${matchId}/messages`,
  );

  const newMessageRef = push(messagesRef);

  const message = {
    id: newMessageRef.key,
    text,
    senderId: currentUser.uid,
    createdAt: Date.now(),
  };

  await set(newMessageRef, message);

  await set(
    ref(
      realtimeDb,
      `chats/${matchId}/lastMessage`,
    ),
    {
      text,
      senderId: currentUser.uid,
      createdAt: Date.now(),
    },
  );
};

// message listner 


const realtimeDb = getDatabase();

export const subscribeToMessages = (
  matchId: string,
  callback: (messages: any[]) => void,
) => {
  const messagesRef = ref(
    realtimeDb,
    `chats/${matchId}/messages`,
  );

  const unsubscribe = onValue(
    messagesRef,
    snapshot => {
      const data = snapshot.val();

      if (!data) {
        callback([]);
        return;
      }

      const messages = Object.entries(data)
        .map(([id, value]: any) => ({
          id,
          ...value,
        }))
        .sort(
          (a, b) =>
            a.createdAt - b.createdAt,
        );

      callback(messages);
    },
  );

  return unsubscribe;
};