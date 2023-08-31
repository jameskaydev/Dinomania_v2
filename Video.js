import { View } from 'react-native'
import WebView from "react-native-webview";

import React from 'react'

const Video = ({ route }) => {
  const { video } = route.params
  return (
    <View style={{ height: '100%', width: '100%'}}>
      <WebView
        source={{
        uri: video
        ? `https://www.youtube.com/embed/${video.id.videoId}`
        : null,
        }}
      />
    </View>
  )
}

export default Video