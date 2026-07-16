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

export const getUserDoc = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid));

  return userDoc;
};

type User = {
  id: string;
  profileImage: string;
  city: string;
  name: string;
  caption : string
};

export const getAllUsers = async (): Promise<User[]> => {
  const snapshot = await getDocs(collection(db, 'users'));

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as User),
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
      createdAt: Date.now(),
    },
  );

  return true;
};