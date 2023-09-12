import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Linking,
} from "react-native";

const Infos = ({ route }) => {
  const { dinosaur } = route.params;
  const { width, height } = Dimensions.get("window");
  const [links, setLinks] = useState(dinosaur.links ? dinosaur.links.split("*") : null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.logoImg}
            source={require("./assets/logo.png")}
          />
          <Image
            style={{
              width: width * 0.6,
              aspectRatio: 1,
              resizeMode: "contain",
              marginBottom: 0,
            }}
            source={{ uri: `https://dinomaniaadmin.com/${dinosaur.img}` }}
          />
          <Text style={styles.title}>{dinosaur.name}</Text>
          <Text style={styles.sectitle}>{dinosaur.secname}</Text>

          <View style={styles.infosContainer}>
            <View style={styles.infos}>
              <Text style={styles.infosName}>Meaning:</Text>
              <Text style={styles.infosValue}>{dinosaur.meaning}</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.infosName}>Diet:</Text>
              <Text style={styles.infosValue}>{dinosaur.diet}</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.infosName}>Length:</Text>
              <Text style={styles.infosValue}>{dinosaur.lengthh}</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.infosName}>Height:</Text>
              <Text style={styles.infosValue}>{dinosaur.height}</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.infosName}>Weight:</Text>
              <Text style={styles.infosValue}>{dinosaur.weight}</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.infosName}>Era:</Text>
              <Text style={styles.infosValue}>{dinosaur.era}</Text>
            </View>
          </View>

          <View style={styles.desc}>
            <Text style={styles.description}>{dinosaur.descriptions}</Text>
            {
              links ? (
                <View style={styles.linksContainer}>
                {links.map((link, index) =>
                  index % 2 === 0 ? (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(links[index + 1])}
                      style={styles.linkContainer}
                      key={index}
                    >
                      <Text style={styles.link}>{link}</Text>
                    </TouchableOpacity>
                  ) : null
                )}
              </View>
              ) : null
            }

          </View>

          <View>
            {dinosaur.charts.map((chart, index) => (
              <Image
                key={index}
                source={{ uri: `https://dinomaniaadmin.com/${chart}` }}
                style={{
                  width: width * 0.8,
                  height: undefined,
                  aspectRatio: 1,
                  resizeMode: "contain",
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#181818",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    position: "relative",
    height: "95%",
    width: "100%",
  },
  logoImg: {
    width: 200,
    height: 40,
    marginTop: 60,
  },
  title: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 28,
    marginBottom: 10,
    marginTop: -10,
  },
  sectitle: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
  },
  dinoImg: {
    width: 400,
    height: "auto",
  },
  infosContainer: {
    width: "80%",
    marginTop: 40,
    marginBottom: 20,
  },
  infos: {
    flex: 1,
    flexDirection: "row",
  },
  infosName: {
    color: "#fff",
    fontSize: 18,
    width: "32%",
    paddingLeft: 30,
    paddingBottom: 10,
  },
  infosValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
    paddingLeft: 20,
    width: "80%",
  },
  desc: {
    backgroundColor: "#FFFB3D",
  },
  description: {
    color: "#181818",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 26,
    padding: 30,
  },
  linksContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    paddingBottom: 50
  },
  linkContainer: {
    alignSelf: "flex-start",
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 2,
    marginRight: 3,
    marginLeft: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.15)'
  },
  link: {
    fontSize: 16,
  },
});

export default Infos;
