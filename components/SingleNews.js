import { Dimensions, StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React, { useContext } from 'react'
import { NewsContext } from '../API/context';

const SingleNews = ({item, index}) => {
    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;
    const {darkTheme} = useContext(NewsContext)
  return (
    <View style={styles.container}>
        <Image
        source={{uri:item.urlToImage}}
        style={{height:"45%", resizeMode:"cover", width:windowWidth}}
      />
      <View style={{...styles.description, backgroundColor:darkTheme ?"#282C35": "white"}}>
      <Text style={{...styles.title, color:darkTheme ?"white": "black"}}>{item.title}</Text>
      <Text style={{...styles.content, color:darkTheme ?"white": "black" }}>{item.description}</Text>
      <Text>
        Short by
        <Text>{item.autor ?? "unKnown" }</Text>
      </Text>
      <ImageBackground>
        <TouchableOpacity onPress={()=>Linking.openURL(item.url)}>
            <Text 
            style={{fontSize:15, color:'white'}} >
                {item?.content?.(0, 45)}...
            </Text>
            <Text style={{fontSize:17,fontWeight:"bold", color:darkTheme ?"white": "black"}}>
                Read more
            </Text>
        </TouchableOpacity>
      </ImageBackground>
      </View>
    </View>
  )
}

export default SingleNews

const styles = StyleSheet.create({
    container:{
        width: windowWidth,
        height: windowHeight,
        transform:[{scaleY: -1}]
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
        paddingBottom:10,
        color:"white"
    },
    footer:{
        height: 80,
        width: windowWidth,
        position:"absolute",
        bottom:0,
        backgroundColor:'#76be69',
        paddingHorizontal:20
    },
    content:{
        fontSize: 18,
        paddingBottom:10
    },
    description:{
        padding: 15,
        flex:1
    }
})
