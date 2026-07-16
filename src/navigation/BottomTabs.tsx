import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../constants/routes';
import StackScreen from '../screens/StackScreen';
import Icon from '../components/Icon';
import { COLORS } from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
const Tabs = createBottomTabNavigator();
const BottomTabs = () => {
  const IconsSwitch = useCallback(
    ({ route, color, size }: { route: any; color?: string; size?: number }) => {
      switch (route.name) {
        case ROUTES.STACK_SCR:
          return <Icon name="Flame" color={color} size={size} />;

        case ROUTES.CHAT_SCR:
          return <Icon name="MessageCircleHeart" color={color} size={size} />;

        case ROUTES.PROFILE_SCR:
          return <Icon name="User" color={color} size={size} />;

        default:
          return null;
      }
    },
    [],
  );
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) =>
      IconsSwitch({ route, color, size }),

        tabBarActiveTintColor: COLORS.ICON_ACTIVE,
        tabBarInactiveTintColor: COLORS.ICONS_INACTIVE,
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND_LIGHT,
          borderTopWidth: 0,
        },
      })}
    >
      <Tabs.Screen name={ROUTES.STACK_SCR} component={StackScreen} />
      <Tabs.Screen name={ROUTES.CHAT_SCR} component={ChatScreen} />
      <Tabs.Screen name={ROUTES.PROFILE_SCR} component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
