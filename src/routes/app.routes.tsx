
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ListProducts } from '@/screens/ListProducts';
import { EditProduct } from '@/screens/EditProduct';
import { UserProfile } from '@/screens/UserProfile';
import { EnterpriseProfile } from '@/screens/EnterpriseProfile';
import { CheckConnection } from '@/screens/CheckConnection';
import { ScanProduct } from '@/screens/ScanProduct';

import { theme } from '@/styles/theme';

type AppRoutes = {
  ListProducts: undefined;
  EditProduct: {
    productBarCode: string;
  }
  UserProfile: undefined;
  EnterpriseProfile: undefined;
  CheckConnection: undefined;
  ScanProduct: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const ICON_SIZE = 24;
const TAB_BAR_HEIGHT = Platform.OS === "android" ? 66 : 96;
const TAB_BAR_PADDING_BOTTOM = Platform.OS === "android" ? 20 : 48;

export function AppRoutes() {
  const { colors } = theme

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blue[500],
        tabBarInactiveTintColor: colors.slate[300],
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopWidth: 0,
          height: TAB_BAR_HEIGHT,
          paddingBottom: TAB_BAR_PADDING_BOTTOM,
          paddingTop: 24
        }
      }}
    >
      <Screen 
        name="ListProducts" 
        component={ListProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="box" color={color} size={ICON_SIZE} />
          )
        }}
      />

      <Screen
        name="CheckConnection"
        component={CheckConnection}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="radio" color={color} size={ICON_SIZE} />
          )
        }}
      />

      <Screen
        name="ScanProduct"
        component={ScanProduct}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="camera" color={color} size={ICON_SIZE} />
          )
        }}
      />

      <Screen
        name="EnterpriseProfile"
        component={EnterpriseProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="trello" color={color} size={ICON_SIZE} />
          )
        }}
      />

      <Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={ICON_SIZE} />
          )
        }}
      />

      <Screen
        name="EditProduct"
        component={EditProduct}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
    </Navigator>
  )
}