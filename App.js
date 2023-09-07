import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Map from "./Map";
import Home from "./Home";
import Infos from "./Infos";
import Learn from './Learn';
import Search from "./Search";
import Videos from './Videos';
import Video from "./Video";
import AppIntro from "./AppIntro";
import Directory from "./Directory";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { Exo2_400Regular, Exo2_500Medium_Italic } from '@expo-google-fonts/exo-2';
import { Outfit_400Regular } from '@expo-google-fonts/outfit';
import { useFonts } from 'expo-font'
import { SERVER, API_KEY } from '@env'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token, error;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
  } catch (err) {
    console.log(err)
    error = err;
  }
  return {token,error};
}

const Stack = createStackNavigator();

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theToken, setTheToken] = useState("");
  const [notification, setNotification] = useState("");
  const responseListener = useRef();
  const notificationListener = useRef();

  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Exo2_400Regular, 
    Exo2_500Medium_Italic
  });

  useEffect(() => {
    try {
    registerForPushNotificationsAsync().then(({token, error}) => {
      setTheToken(token);
      axios.post(`${SERVER}/api/saveToken?platform=ios&token=${token}`, {}, {
        headers: {
          auth: API_KEY,
        }
      })
    });    
  } catch (err) {}


    notificationListener.current = Notifications.addNotificationReceivedListener((notif) => {
      setNotification(notif);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false)
    }, 2000)
  }, [])

  const options = {
    headerStyle: {
      backgroundColor: '#181818',
    },
    headerTintColor: '#fff',
    headerShadowVisible: false,
  };

  return (
    <>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {showIntro ? (
          <Stack.Screen name="AppItro" component={AppIntro} options={{title: '', ...options}} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} options={{title: '', ...options}} />
            <Stack.Screen name="Map" component={Map} options={options} />
            <Stack.Screen name="Search" component={Search} options={options} />
            <Stack.Screen name="Infos" component={Infos} options={options} />
            <Stack.Screen name="Directory" component={Directory} options={options} />
            <Stack.Screen name="Learn" component={Learn} options={options} />
            <Stack.Screen name="Videos" component={Videos} options={options} />
            <Stack.Screen name="Video" component={Video} options={options} />
            <Stack.Screen name="Info" component={Infos} options={{title: "Information", ...options}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}