import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";

import { SpotifyProvider } from "./components/SpotifyContext";
import globals from "./Globals";
import HomeScreen from "./components/Home";
import LogInScreen from "./components/LogIn";
import ResultsScreen from "./components/Results";
import SettingsScreen from "./components/Settings";
import SignUpScreen from "./components/SignUp";
import HistoryScreen from "./components/History";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <SpotifyProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Results") {
              iconName = focused ? "rocket" : "rocket-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
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
        {/* <Tab.Screen
          name="Results"
          component={ResultsScreen}
          options={{ headerShown: false }}
        /> */}
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: globals.colors.base.secondary,
            },
            headerTintColor: globals.colors.text.primary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color={globals.colors.text.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        {/* <Tab.Screen name="Results" component={ResultsScreen} /> */}
      </Tab.Navigator>
    </SpotifyProvider>
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
    <SpotifyProvider>
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
            options={({ navigation }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: globals.colors.base.secondary,
              },
              headerTintColor: globals.colors.text.primary,
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={globals.colors.text.primary}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: globals.colors.base.secondary,
              },
              headerTintColor: globals.colors.text.primary,
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={globals.colors.text.primary}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SpotifyProvider>
  );
}
