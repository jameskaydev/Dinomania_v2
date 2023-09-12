import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
} from "react-native";
import Search from "./Search";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import 'react-native-gesture-handler';

const Map = ({ navigation }) => {
  const [dinos, setDinos] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(4);
  const [err, setErr] = useState('');
  const ref = useRef(null)

  useEffect( () => {
    
    const fetchDinos = async () => {
      const data = await fetch(`https://dinomaniaadmin.com/api/cat/dinosaurs`, {
        method: "GET",
        headers: {
          auth: 'H3l5b1T5YRAD156iXNJO',
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
          minZoomLevel={2}
          maxZoomLevel={10}
          mapType="satellite"
          style={{
            width: '100%',
            height: '100%'
          }}
          onRegionChange={async (region) => {
            const coords = await ref?.current?.getCamera();
            setZoomLevel(coords.zoom)
          }}
          ref={ref}
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
                  source={{ uri: `https://dinomaniaadmin.com/${dinosaur.img}` }}
                  width={zoomLevel > 4 ? (zoomLevel >= 6 ? 100 : 70 ) : 40}
                  resizeMode="contain"
                  style={{
                    minHeight: 70,
                    maxHeight: 160
                  }}
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
