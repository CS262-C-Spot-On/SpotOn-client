import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";

import globals from "./Globals";
import HomeScreen from "./components/Home";
import LogInScreen from "./components/LogIn";
import ResultsScreen from "./components/Results";
import SettingsScreen from "./components/Settings";
import SignUpScreen from "./components/SignUp";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: globals.colors.text.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: globals.colors.base.secondary },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Results" component={ResultsScreen} /> */}
    </Tab.Navigator>
  );
}
export default function App() {
  setBackgroundColorAsync(globals.colors.base.primary);

  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{ headerShown: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="SettingsTabs"
          component={HomeTabs}
          options={{ headerShown: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ headerShown: false, cardStyleInterpolator: forFade }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
