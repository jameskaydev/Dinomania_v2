import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";

const PAGE_SIZE = 15;

const Directory = ({ navigation }) => {
  const [dinos, setDinos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://89.117.36.161/api/dinos?sorted=1`, {
        headers: {
          auth: "H3l5b1T5YRAD156iXNJO",
        },
      })
      .then((response) => {
        const allDinos = response.data;
        setDinos(allDinos.slice(0, PAGE_SIZE));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    axios
      .get(`http://89.117.36.161/api/dinos?sorted=1`, {
        headers: {
          auth: "H3l5b1T5YRAD156iXNJO",
        },
      })
      .then((response) => {
        const allDinos = response.data;
        const newDinos = allDinos.slice(startIndex, endIndex);
        setDinos([...dinos, ...newDinos]);
        setIsLoading(false);
        setCurrentPage(nextPage);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={dinos.length && styles.directoryContainer}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {dinos.map((dino) => (
          <TouchableOpacity
            key={dino?._id}
            style={styles.dinoCard}
            onPress={() => navigation.navigate("Infos", { dinosaur: dino })}
          >
            <Image
              source={{ uri: `http://89.117.36.161/${dino.img}` }}
              loadingIndicatorSource={require("./assets/loading.png")}
              resizeMode="contain"
              style={styles.dinoImg}
            />
            <View style={styles.dinoTitles}>
              <Text style={styles.dinoName}>{dino.name}</Text>
              <Text style={styles.dinoSec}>{dino.secname}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {isLoading && currentPage > 0 ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const styles = StyleSheet.create({
  directoryContainer: {
    backgroundColor: "rgba(24,24,24,1)",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
  },
  dinoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(24,24,24, 1)",
    marginTop: 10,
  },
  dinoTitles: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  dinoName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dinoSec: {
    color: "#D3D3D3",
    fontSize: 12,
  },
  dinoImg: {
    width: 100,
    height: 100,
  },
});

export default Directory;
