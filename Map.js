import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
} from "react-native";
import Search from "./Search";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// const Map = ({ onPress, dinos }) => {
const Map = ({ navigation }) => {
  const [dinos, setDinos] = useState([]);

  useEffect( () => {
    const fetchDinos = async () => {

      const data = await fetch("http://89.117.36.161/api/cat/dinosaurs", {
        method: "GET",
        headers: {
          auth: "H3l5b1T5YRAD156iXNJO",
        }
      });
      const main = await data.json();
      setDinos(main)
    }

    fetchDinos()
  }, []);

  const handleDinosaurs = dinosaurs => {
    setDinos(dinosaurs)
  }

  const handleDinosaurPress = (dinosaur) => {
    setSelectedDinosaur(dinosaur);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: "#181818",
      }}
    >
      <Search
        setDinos={handleDinosaurs}
      />
      <MapView 
          provider={PROVIDER_GOOGLE}
          userInterfaceStyle='dark'
          mapType="satellite"
          style={{
            width: '100%',
            height: '100%'
          }}
      >
        {
          dinos && dinos.map( (dinosaur, index) => {
            return (
              <Marker
              key={index}
              coordinate={{latitude: dinosaur.locationx, longitude: dinosaur.locationy}}
              title={dinosaur.name}
              onPress={() => navigation.navigate("Infos", {dinosaur: dinosaur})}
              >
                <Image
                  source={{ uri: `http://89.117.36.161/${dinosaur.img}` }}
                  width={40}
                  height={30}
                />
              </Marker>
            )
          })
        }
      </MapView>
    </View>
  );
};

export default Map;
