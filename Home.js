import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const Home = ({ navigation }) => {
  return (
    <View style={{ position: "relative", height: '100%' }}>
      <ImageBackground
        source={require("./assets/eb2.jpeg")}
        resizeMode="cover"
      >
        <View style={styles.homeContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 250, height: 50 }}
          />

          <View>
            <View style={styles.welcome}>
              <Text style={styles.dinoMsg}>Welcome to</Text>
              <Text style={styles.dinoName}>Dinomania prehistoric planet.</Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.dinoMsg}>
                Use the map to look around the world and find what creatures
                lived where. You can even check out the directory to find a
                prehistoric creature of your choice and learn all about them. We
                hope you enjoy
              </Text>
              <Text style={styles.dinoName}>Dinomania prehistoric planet.</Text>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <LinearGradient
              colors={["#E86F02", "#FFFE00"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mapGr}
            >
              <TouchableOpacity style={styles.mapBtn} onPress={() => navigation.navigate("Map")}>
                <Text style={styles.mapTxt}>Map</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity style={styles.listBtn} onPress={() => navigation.navigate("Learn")}>
              <Text style={styles.listTxt}>Learn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.listBtn} onPress={() => navigation.navigate("Directory")}>
              <Text style={styles.listTxt}>Directory</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.youtubeBtn} onPress={() => navigation.navigate("Videos")}>
              <Text style={styles.youtubeTxt}>Youtube</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 100,
  },
  welcome: {
    marginBottom: 40,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: 'Outfit_400Regular'
  },
  description: {
    textAlign: "center",
    alignItems: "center",
    fontFamily: 'Outfit_400Regular'
  },
  dinoMsg: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  dinoName: {
    width: "100%",
    color: "#F09F01",
    fontSize: 20,
    textAlign: "center",
  },
  mapGr: {
    borderRadius: 10,
  },
  mapTxt: {
    color: "#000",
    fontSize: 18,
    textAlign: 'center'
  },
  mapBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },
  listTxt: {
    color: "#000",
    fontSize: 18,
    textAlign: 'center'
  },
  listBtn: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
  youtubeTxt: {
    color: "#fff",
    fontSize: 18,
    textAlign: 'center'
  },
  youtubeBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnContainer: {
    gap: 10,
  },
});

export default Home;
