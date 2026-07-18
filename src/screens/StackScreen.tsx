import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import { COLORS } from '../constants/colors';
import {
  createMatchIfExists,
  getAllStackUsers,
  saveSwipe,
} from '../services/userService';
import { s, vs, ms } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');
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
  const isDarkMode = useColorScheme() === 'dark';

   const getUserData = async () => {
      setLoading(true);
      const data = await getAllStackUsers();
      setUser(data);
      setLoading(false);
      console.log(data);
    };
  useFocusEffect(
  useCallback(() => {
    getUserData();
  }, []),
);
 
  const renderCard = (card?: User) => {
    if (!card) {
      return (
        <View style={styles.emptyContainer}>
  <Text style={styles.emptyTitle}>
    No more profiles
  </Text>

  <Text style={styles.emptySubtitle}>
    Check back later for new matches.
  </Text>
</View>
      );
    }

    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: card.profileImage || 'https://via.placeholder.com/400',
          }}
          style={styles.cardImg}
        />
        <View style={styles.overlay} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{card.name || 'Unknown'}</Text>

          <Text style={styles.city}>{card.city || 'Unknown city'}</Text>

          <Text style={styles.caption}>{card.caption || 'No caption'}</Text>
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
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  style: {
                    label: {
                      borderColor: 'red',
                      color: 'red',
                      borderWidth: 4,
                      fontSize: 32,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30,
                    },
                  },
                },
                right: {
                  title: 'LIKE',
                  style: {
                    label: {
                      borderColor: 'green',
                      color: 'green',
                      borderWidth: 4,
                      fontSize: 32,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30,
                    },
                  },
                },
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
    height: vs(80),
    justifyContent: 'center',
    paddingHorizontal: s(20),
    paddingTop: StatusBar.currentHeight || 0,
  },

  heroTxt: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(24),
    fontWeight: '900',
  },

  swiperContainer: {
    flex: 1,
    paddingHorizontal: s(12),
    paddingBottom: vs(20),
  },

  card: {
    width: width - s(24),
    height: height * 0.75,
    borderRadius: ms(24),
    overflow: 'hidden',
    alignSelf: 'center',
  },

  cardImg: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.CARD_OVERLAY,
  },

  infoContainer: {
    position: 'absolute',
    left: s(20),
    right: s(20),
    bottom: vs(24),
  },

  name: {
    color: COLORS.COLOR_WHITE,
    fontSize: ms(30),
    fontWeight: '700',
    marginBottom: vs(4),
  },

  city: {
    color: COLORS.COLOR_WHITE,
    fontSize: ms(18),
    fontWeight: '500',
    marginBottom: vs(8),
  },

  caption: {
    color: COLORS.COLOR_WHITE,
    fontSize: ms(16),
    lineHeight: vs(22),
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(24),
  },

  emptyTitle: {
    fontSize: ms(24),
    fontWeight: '700',
    color: COLORS.COLOR_DARK,
  },

  emptySubtitle: {
    marginTop: vs(10),
    color: COLORS.COLOR_TEXT_TERTIARY,
    fontSize: ms(16),
    textAlign: 'center',
    lineHeight: vs(24),
  },
});
