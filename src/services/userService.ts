import { auth, db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from '@react-native-firebase/firestore';
export const saveProfile = async (imageUrl: string,city : string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not found');
  }

  await setDoc(
    doc(db, 'users', user.uid),
    {
    id : user.uid,
      profileImage: imageUrl,
      city : city,
      name : user.displayName ? user.displayName : ''
    },
    { merge: true },
  );
};

export const getCurrentUserDoc = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  return await getDoc(doc(db, 'users', uid));
};

type User = {
  id: string;
  profileImage: string;
  city: string;
  name: string;
  caption : string
};
// not used any where
export const getAllUsers = async (): Promise<User[]> => {
  const currentUid = auth.currentUser?.uid;

  const snapshot = await getDocs(collection(db, 'users'));

  return snapshot.docs
    .map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User),
    )
    .filter(user => user.id !== currentUid);
};

export const getAllStackUsers = async (): Promise<User[]> => {
  const currentUid = auth.currentUser?.uid;

  if (!currentUid) {
    return [];
  }

  const usersSnapshot = await getDocs(collection(db, 'users'));

  const likesSnapshot = await getDocs(
    collection(db, 'swipes', currentUid, 'likes'),
  );

  const passesSnapshot = await getDocs(
    collection(db, 'swipes', currentUid, 'passes'),
  );

  const swipedUserIds = new Set([
    ...likesSnapshot.docs.map(doc => doc.id),
    ...passesSnapshot.docs.map(doc => doc.id),
  ]);

  return usersSnapshot.docs
    .map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User),
    )
    .filter(
      user =>
        user.id !== currentUid &&
        !swipedUserIds.has(user.id),
    );
};


type SwipeType = 'likes' | 'passes';

export const saveSwipe = async (
  targetUserId: string,
  type: SwipeType,
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  await setDoc(
    doc(db, 'swipes', user.uid, type, targetUserId),
    {
      createdAt: Date.now(),
    },
  );
};


export const createMatchIfExists = async (
  targetUserId: string,
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const matchDoc = await getDoc(
    doc(db, 'swipes', targetUserId, 'likes', user.uid),
  );

  if (!matchDoc.exists()) {
    return false;
  }

  const matchId = [user.uid, targetUserId]
    .sort()
    .join('_');

  await setDoc(
    doc(db, 'matches', matchId),
    {
      users: [user.uid, targetUserId],
      lastMessage: '',
      lastMessageAt: Date.now(),
      createdAt: Date.now(),
    },
  );

  return true;
};

export const updateProfile = async (data: {
  name? : string;
  city?: string;
  caption?: string;
  interests?: string[];
  profileImage?: string;
}) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not found');
  }

  await setDoc(
    doc(db, 'users', user.uid),
    data,
    { merge: true },
  );
};