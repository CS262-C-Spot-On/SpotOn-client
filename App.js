/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/************************************************************************************************************
 * Screens Include:
 *           HomeScreen: It features a text input where users can type prompts for music suggestions.
 *
 *        ResultsScreen: Utilizes a large language model (LLM) to suggest songs based on a user's prompt.
 *                       Users can view the suggested songs, add them to a playlist, and even create and
 *                       access this playlist on Spotify.
 *
 *       SettingsScreen: allows users to customize their experience in the application.
 *
 *        HistoryScreen: displays a history of prompts used by the user,
 *
 *          LogInScreen
 *
 *         SignUpScreen
 *
 *      Spotify Context: The SpotifyProvider from SpotifyContext.js is used as a context provider, managing
 *                        state or data related to Spotify integration.
 *
 *
 *
 * Navigation Structure: Incorporates a main stack navigator (Stack.Navigator) with different screens
 *                       and a tab navigator (Tab.Navigator) for the bottom tab navigation, which includes Home,
 *                       Settings, and possibly other tabs.
 *************************************************************************************************************/

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

import { Alert } from "react-native";

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
                style={{ marginLeft: 15 }}
                color={globals.colors.text.primary}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="information-circle-outline"
                size={24}
                style={{ marginRight: 15 }}
                color={globals.colors.text.primary}
                onPress={() => {
                  Alert.alert(
                    "Help",
                    "This is the settings page! Here you will find options to either disconnect your spotify account, or view your prompt history." +
                      "To find out more about prompt history, navigate to the history page and click on the 'i' icon."
                  );
                }}
              />
            ),
          })}
        />
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
                  style={{ marginLeft: 15 }}
                  color={globals.colors.text.primary}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: () => (
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  style={{ marginRight: 15 }}
                  color={globals.colors.text.primary}
                  onPress={() => {
                    Alert.alert(
                      "Help",
                      "This is the results page! Here you can find all the fantastic songs generated by SpotOn. " +
                        "These songs have been matched with their Spotify copies, but are not in your account yet. " +
                        "In order to push the playlist to your account, click the 'copy to spotify' button. " +
                        "If you would like to remove a song, simply click the trashcan logo. " +
                        "To play or view a song on Spotify individual, click on the title of the song. " +
                        "Finally, if you would like to generate additional songs that fit the theme of the playlist, click 'add song'."
                    );
                  }}
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
                  style={{ marginLeft: 15 }}
                  color={globals.colors.text.primary}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: () => (
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  style={{ marginRight: 15 }}
                  color={globals.colors.text.primary}
                  onPress={() => {
                    Alert.alert(
                      "Help",
                      "This is the history page! This holds all of the previous prompts entered, as well as the date you entered it on. " +
                        "To reproduce the results of a previous prompt, simply click on the prompt in quotations."
                    );
                  }}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SpotifyProvider>
  );
}
