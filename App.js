import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { setBackgroundColorAsync } from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import SignUpScreen from "./components/SignUp";
import LogInScreen from "./components/LogIn";
import HomeScreen from "./components/Home";
import ResultsScreen from "./components/Results";
import globals from "./Globals";

export default function App() {
  const Stack = createStackNavigator();

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
          name="Home"
          component={HomeScreen}
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
