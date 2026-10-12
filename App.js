import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProviders, useAuth, useTheme, useCart } from './src/context';
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import ReservationsScreen from './src/screens/ReservationsScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  const { user } = useAuth();
  const { colors: c } = useTheme();
  const { cart } = useCart();
  const count = cart.items.reduce((n, i) => n + i.qty, 0);
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: c.bg }, headerTintColor: c.text,
      tabBarStyle: { backgroundColor: c.bg }, tabBarActiveTintColor: c.primary }}>
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarBadge: count || undefined }} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Reserve" component={ReservationsScreen} />
      {user.role === 'manager' && <Tab.Screen name="Dashboard" component={DashboardScreen} />}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function Root() {
  const { user, ready } = useAuth();
  const { colors: c } = useTheme();
  // wait until the saved login has been read so the Login screen does not flash
  if (!ready) return <View style={{ flex: 1, justifyContent: 'center', backgroundColor: c.bg }}><ActivityIndicator size="large" color={c.primary} /></View>;
  return user ? <Tabs /> : <LoginScreen />;
}

export default function App() {
  return (
    <SafeAreaProvider><AppProviders><NavigationContainer><Root /></NavigationContainer></AppProviders></SafeAreaProvider>
  );
}
