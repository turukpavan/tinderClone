import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import { COLORS } from '../constants/colors';
import { createMatchIfExists, getAllUsers, saveSwipe } from '../services/userService';
type User = {
  id: string;
  profileImage: string;
  city: string;
  name: string;
  caption: string;
};
const StackScreen = () => {
  const [users, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'light';

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const data = await getAllUsers();
      setUser(data);
      setLoading(false);
      console.log(data);
    };
    getUserData();
  }, []);
  const renderCard = (card?: User) => {
    if (!card) {
      return (
        <View style={styles.card}>
          <Text>No more users</Text>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: card.profileImage }} style={styles.cardImg} />

        <View style={styles.overlay} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{card.name}</Text>

          <Text style={styles.city}>{card.city}</Text>

          <Text style={styles.caption}>{card.caption}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.BACKGROUND_LIGHT}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.COLOR_DARK} />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.heroTxt}>Tinder</Text>
          </View>

          <View style={styles.swiperContainer}>
            <Swiper
              cards={users}
              renderCard={renderCard}
              backgroundColor={COLORS.BACKGROUND_LIGHT}
              stackSize={3}
              stackSeparation={15}
              verticalSwipe={false}
              cardVerticalMargin={0}
              marginTop={0}
              onSwipedRight={async cardIndex => {
                const likedUser = users[cardIndex];

                await saveSwipe(likedUser.id, 'likes');

                const isMatch = await createMatchIfExists(likedUser.id);

                if (isMatch) {
                  console.log('🎉 Match!');
                }
              }}
              onSwipedLeft={async cardIndex => {
                const passedUser = users[cardIndex];

                saveSwipe(passedUser.id, 'passes');
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default StackScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroTxt: {
    color: COLORS.BACKGROUND_RED,
    fontSize: 20,
    fontWeight: '900',
  },

  swiperContainer: {
    flex: 1,
  },

  card: {
    width: '100%',
    height: '80%',
    borderRadius: 24,
    overflow: 'hidden',
  },

  cardImg: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  infoContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },

  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },

  city: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },

  caption: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});
