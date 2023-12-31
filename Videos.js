import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";

const Videos = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [isAll, setIsAll] = useState(false);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetchChannelContent();
      setVideos(data);
    };
    fetchContent();
  }, []);

  const fetchChannelContent = async () => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: 'AIzaSyASQJD8T53iDN6dSs346NziCJIourJlTDw',
          channelId: "UCke5I8zQqBID3oDce08u4UQ",
          part: "snippet",
          maxResults: 50,
          order: "date",
          type: "video",
          videoDuration: 'medium'
        },
      }
    );
    response.data.nextPageToken ? setNextPageToken(response.data.nextPageToken) : setIsAll(true);
    return response.data.items;
  };

  const loadMore = async () => {
    const data = await fetchChannelContent();
    setVideos([...videos, ...data]);
  }

  return (
    <>
      <ScrollView style={styles.videosContainer} onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && !isAll) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}>
        {videos.map((video, index) => (
          <TouchableOpacity
            key={video.id.videoId}
            style={styles.singleVideoContainer}
            onPress={() => navigation.navigate("Video", { video: video })}
          >
            <Image
              source={{ uri: video.snippet.thumbnails.medium.url }}
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
            />
            <View
              style={styles.playIconContainer}
              height={video.snippet.thumbnails.medium.height}
            >
              <Image
                source={require("./assets/play-icon.png")}
                style={styles.playIcon}
              />
            </View>
            <Text style={styles.videoTitle}>{video.snippet.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  videosContainer: {
    backgroundColor: "#181818",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: 40,
  },
  singleVideoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(211,211,211, 0.2)",
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 20,
    marginBottom: 20,
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    width: 50,
    height: 50,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Videos;
