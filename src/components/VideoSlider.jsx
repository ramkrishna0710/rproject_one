import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';

const VideoSlider = ({ videosData, horizontal }) => {

  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const renderItem = ({ item, index }) => {
    // console.warn("Video URL: ", item.video_url); // Log the URL to verify it's correct

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setCurrentVideoIndex(index)}
      >
        {currentVideoIndex === index ? (
          <Video
            source={{ uri: item.video_url ? item.video_url : "https://via.placeholder.com/150" }}
            style={styles.video}
            controls
            resizeMode="cover"
          />
        ) : (
          <Image 
            source={{ uri: item.video_thumbnail ? `${item.http_url}${item.video_thumbnail}` : "https://via.placeholder.com/150" }} 
            style={styles.thumbnail} 
          />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {item.video_title || "Untitled Video"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videosData}
        renderItem={renderItem}
        keyExtractor={(item) => item.video_id.toString()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    borderRadius: theme.radius.xxl,
    margin: theme.radius.sm,
    paddingVertical: theme.padding.xxs,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: 8,
    elevation: 0.9,
    shadowColor: theme.colors.lightGrey,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  thumbnail: {
    width: wp(91),
    height: hp(26),
    borderRadius: theme.radius.xxl,
  },
  video: {
    width: wp(91),
    height: hp(26),
    borderRadius: theme.radius.xxl,
  },
  title: {
    width: wp(91),
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.lightGrey,
    padding: theme.padding.xxs,
  },
});

export default VideoSlider;
