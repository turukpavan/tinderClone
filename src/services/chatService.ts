import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from '@react-native-firebase/database';

import {
  collection,
  doc,
  getDoc,
  getDocs,
} from '@react-native-firebase/firestore';

import { auth, db } from '../config/firebase';

const realtimeDb = getDatabase();

export const getMatches = async () => {
  try {
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
  } catch (error) {
    console.log('getMatches error:', error);
    throw error;
  }
};

export const sendMessage = async (
  matchId: string,
  text: string,
) => {
  try {
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
      text: text.trim(),
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
        text: text.trim(),
        senderId: currentUser.uid,
        createdAt: Date.now(),
      },
    );
  } catch (error) {
    console.log('sendMessage error:', error);
    throw error;
  }
};

export const subscribeToMessages = (
  matchId: string,
  callback: (messages: any[]) => void,
  onError?: (error: unknown) => void,
) => {
  const messagesRef = ref(
    realtimeDb,
    `chats/${matchId}/messages`,
  );

  return onValue(
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
          (a: any, b: any) =>
            a.createdAt - b.createdAt,
        );

      callback(messages);
    },
    error => {
      onError?.(error);
    },
  );
};