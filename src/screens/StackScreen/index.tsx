import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import { COLORS } from '../../constants/colors';
import { useStackUsers, User } from '../../hooks/useStackUser';
import { SWIPER_OVERLAY_LABELS } from '../../constants/swiperOverlay';
import { styles } from './styles';
import { s } from '../../utils/scaling';
import Loader from '../../components/Loader';

const StackScreen = () => {
  const { width, height } = useWindowDimensions();

  const { users, loading, fetchUsers, handleSwipeRight, handleSwipeLeft } =
    useStackUsers();

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers]),
  );

  const renderCard = useCallback(
    (card?: User) => {
      if (!card) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No more profiles</Text>
            <Text style={styles.emptySubtitle}>
              Check back later for new matches.
            </Text>
          </View>
        );
      }

      return (
        <View
          style={[styles.card, { width: width - s(24), height: height * 0.75 }]}
        >
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
    },
    [width, height],
  );

  

  return (
    <View style={[styles.container, { backgroundColor: COLORS.BACKGROUND_LIGHT}]}>
     

      {loading ? (
        <View style={styles.loaderContainer}>
           <Loader
    size="large"
    color={COLORS.COLOR_LOADER_RED}
    backgroundColor={COLORS.BACKGROUND_LIGHT}
          />
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
              backgroundColor="transparent"
              stackSize={3}
              stackSeparation={15}
              verticalSwipe={false}
              cardVerticalMargin={0}
              marginTop={0}
              onSwipedRight={handleSwipeRight}
              onSwipedLeft={handleSwipeLeft}
              overlayLabels={SWIPER_OVERLAY_LABELS}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default StackScreen;


