import { View, Text, FlatList,ImageBackground,Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { ResizeMode, Video } from "expo-av";



const zoomIn ={
  0:{
    scale: 0.9
  },
  1:{
    scale:1.1,
  }
}

const zoomOut ={
  0:{
    scale: 1
  },
  1:{
    scale:0.9,
  }
}



const TrendingItems = ({activeItem, item})=>{

  const [play, setPlay] = useState(false);
  return(
    <Animatable.View
    className="mr-5"
    animation={activeItem === item.$id ? zoomIn : zoomOut }
    duration={500}
    >
    {play ? (
      <Video
      source={{uri:item.video}}
  /*source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} */
  className="w-52 h-72 mt-3 bg-white/10"
  resizeMode={ResizeMode.CONTAIN}
  useNativeControls
  shouldPlay
  onPlaybackStatusUpdate={(status) => {
    console.log("Playback Status: ", status);
    if (status.didJustFinish) {
      setPlay(false);
    }
  }}
  onError={(error) => {
    console.error("Video playback error: ", error);
  }}
/>
    ): (
      <TouchableOpacity  
      className="relative justify-center items-center"
      activeOpacity={0.7}
      onPress={()=> setPlay(true)}
      >
      <ImageBackground
      source={{
        uri:item.thumbnail
      }}
      className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-black/40"
      resizeMode='cover'
      />
      <Image
        source={icons.play}
        className="w-12 h-12 absolute"
      />
      </TouchableOpacity>
    )}
    </Animatable.View>
  )
}



const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemChanged=({viewableItems})=>{
    if(viewableItems.length>0){
      setActiveItem (viewableItems[0].key)
    }
  }
  return ( 
    <FlatList
      data={posts}
      keyExtractor={(item)=> item.$id}
      renderItem={({item})=>(
       <TrendingItems activeItem={activeItem} item={item}/>
      )}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold:70
      }}
      contentOffset={{x:170}}
      horizontal
    />
  )
}

export default Trending