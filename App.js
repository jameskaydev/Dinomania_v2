import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Linking, Text } from "react-native";
import Map from "./Map";
import Home from "./Home";
import Infos from "./Infos";
import Search from "./Search";
import Videos from './Videos';
import AppIntro from "./AppIntro";
import Directory from "./Directory";
import axios from "axios";
// import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

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

  // if (Constants.isDevice) {
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
  // } else {
  //   alert("Must use physical device for Push Notifications");
  // }
  } catch (err) {
    console.log(err)
    error = err;
  }

  return {token,error};
}

export default function App() {
  const [selectedDinosaur, setSelectedDinosaur] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showDirectory, setShowDirectory] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [theToken, setTheToken] = useState("");
  const [notification, setNotification] = useState("");
  const timeout = useRef(null);
  const responseListener = useRef();
  const notificationListener = useRef();

  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    try {
    registerForPushNotificationsAsync().then(({token, error}) => {
      setTheToken(token);
      axios.post(`http://89.117.36.161/api/saveToken?platform=ios&token=${token}`, {}, {
        headers: {
          auth: 'H3l5b1T5YRAD156iXNJO',
        }
      })
      if (error) {
        setError(error);
      }
    });    
  } catch (err) {
    console.log(err);
    setError2(err);
  }


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

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  const handleSearchText = (text) => {
    if (text) {
      setSearch(text);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        axios
          .get(`http://89.117.36.161/api/dino?s=${search}`, {
            headers: {
              auth: "H3l5b1T5YRAD156iXNJO",
            },
          })
          .then((response) => {
            setSearchResults(response.data);
          });
      }, 1000);
    } else {
      setSearch(text);
      clearTimeout(timeout.current);
      setSearchResults([]);
    }
  };

  const handleDinosaurPress = (dinosaur) => {
    setSelectedDinosaur(dinosaur);
  };

  const handleCloseModal = () => {
    setSelectedDinosaur(null);
  };

  const cleanSearchArea = () => {
    setSearchResults([]);
    setSearch(null);
  };

  const showTheDirectory = () => {
    setShowDirectory(!showDirectory);
  };

  const showTheVideos = () => {
    setShowVideos(!showVideos);
  };

  const showTheMap = () => {
    setShowMap(!showMap);
  };

  return (
    <>
    {theToken ? (
      <Text style={{color: 'red'}}>
        {theToken}
      </Text>
    ) : (
      <Text style={{color: 'red'}}>
        There is no token: {'\n'}
        {error ? JSON.stringify(error) : null} {'\n'}
        {error2? JSON.stringify(error2) : null}
      </Text>
    )}
      {/* {showIntro && <AppIntro onFinish={handleIntroFinish} />}
      {showIntro ? null : !showMap && !showDirectory && !showVideos && (
        <Home
          showTheMap={showTheMap}
          showTheDirectory={showTheDirectory}
          showTheVideos={showTheVideos}
          theToken={theToken}
        />
      )}
      {showIntro ? null : (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Map
              onPress={handleDinosaurPress}
              showMap={showMap}
              showTheMap={showTheMap}
            />
            {showMap && (
              <Search
                handleSearch={handleSearchText}
                searchResults={searchResults}
                handler={handleDinosaurPress}
                cleanSearch={cleanSearchArea}
                search={search}
              />
            )}
            {selectedDinosaur && (
              <Infos
                visible={selectedDinosaur ? true : false}
                dinosaur={selectedDinosaur}
                onClose={handleCloseModal}
              />
            )}
          </View>
        </View>
      )}
      {showDirectory ? (
        <Directory
          handlePress={handleDinosaurPress}
          showTheDirectory={showTheDirectory}
        />
      ) : null}

      {showVideos && <Videos showTheVideos={showTheVideos} />} */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introcontainer: {
    flex: 1,
    height: "100%",
  },
  text: {
    marginTop: 100,
  },
});
// test mac