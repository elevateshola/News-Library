import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/context'
import Carousel from "react-native-snap-carousel"
import SingleNews from '../components/SingleNews'


const NewsScreen = () => {
    const {news:{articles},darkTheme}= useContext(NewsContext)
    const windowHeight = Dimensions.get("window").height
    const [activeIndex, setActiveIndex]= useState()
  return (
    <View style={styles.carousel}>
      {articles && (
        <Carousel
        layout={"stack"}
        data={articles.slice(0, 10)}
        sliderHeight={300}
        itemHeight={windowHeight}
        vertival={true}
        renderItem={({item, index})=>(
            <SingleNews item={item} index={index} darkTheme={darkTheme} />
        )}
        onSnapToItem={index=> setActiveIndex(index)}
      />
      )}
    </View>
  )
}

export default NewsScreen

const styles = StyleSheet.create({
    carousel:{
        flex:1,
        backgroundColor: "black",
        transform: [{scaleY: -1}]
    }
})