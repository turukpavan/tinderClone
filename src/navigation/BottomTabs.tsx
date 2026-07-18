import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';
import { BottomTabParamList } from './navigation';

import StackScreen from '../screens/StackScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatListScreen from '../screens/ChatListScreen';
import Icon from '../components/Icon';

const Tabs = createBottomTabNavigator<BottomTabParamList>();

const getScreenOptions = ({
  route,
}: {
  route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: COLORS.ICON_ACTIVE,
  tabBarInactiveTintColor: COLORS.ICONS_INACTIVE, 
  tabBarStyle: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderTopWidth: 0,
    elevation: 0, 
  },
  tabBarIcon: ({ color, size }) => {
    switch (route.name) {
      case ROUTES.STACK_SCR:
        return <Icon name="Flame" color={color} size={size} />;
      case ROUTES.CHAT_LIST_SCR:
        return <Icon name="MessageCircleHeart" color={color} size={size} />;
      case ROUTES.PROFILE_SCR:
        return <Icon name="User" color={color} size={size} />;
      default:
        return null;
    }
  },
});

const BottomTabs = () => {
  return (
    <Tabs.Navigator screenOptions={getScreenOptions}>
      <Tabs.Screen name={ROUTES.STACK_SCR} component={StackScreen} />
      <Tabs.Screen name={ROUTES.CHAT_LIST_SCR} component={ChatListScreen} />
      <Tabs.Screen name={ROUTES.PROFILE_SCR} component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabs;