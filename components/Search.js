import { BackHandler, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/context'
import  { Entypo } from '@expo/vector-icons'
import SingleNews from './SingleNews'

const Search = () => {
  
    const {news:{articles}, darkTheme}= useContext(NewsContext)

    const[searchResults, setSearchResults]=useState([])
    const[modalVisible, setModalVisible]=useState(false)
    const[currentNews, setCurrentNews]=useState()

    const handleSearch=(text)=>{
        if(!text){
            setSearchResults([])
            return;
        }
        setSearchResults(articles.filter((query)=>query.includes(text)))
    };

  const  handleMoadal = (n)=>{
    setModalVisible(true);
    setCurrentNews(n)
  }
  return (
    <View style={{width:"100%", position:"absolute"}}>
      <TextInput
      style={{...styles.search,
         backgroundColor:darkTheme ?"black": "lightgrey", 
         color:darkTheme ?"white": "black"}}
      onChangeText={(text)=>handleSearch(text)}
      placeholder="search for new"
      placeholderTextColor={darkTheme ?"white": "grey"}
      />
      <View style={styles.searchResults}>
        {setSearchResults.slice(0, 10).map(n => (
            <TouchableOpacity
                key={n.title}
                activeOpacity={0.7}
                onPress={()=>handleMoadal(n)}
            >
                <Text style={{...styles.singgleResult,
                  backgroundColor:darkTheme ?"black": "white", 
                  color:darkTheme ?"white": "black"}}>
                    {n.title}
                </Text>
            </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
            setModalVisible(!modalVisible)
        }}
      >
        <TouchableOpacity
        onPress={()=>setModalVisible(!modalVisible)}
        style={{
            position:"absolute",
            zIndex:2,
            right:0,
            margin:10,
            marginTop:60
        }}
        >
            <Entypo name='circle-with-cross' size={30} color='white' />
            <View style={{height:"100%", transform:[{scaleY: -1}]}} >
                <SingleNews item={currentNews} darkTheme={darkTheme} />
            </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    search:{
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:10,
        fontStyle:15,
        marginBottom:15
    },
    searchResults:{
        position:"absolute",
        zIndex:1,
        top:50,
    },singgleResult:{
        borderRadius:5,
        padding:10,
        margin:0.5,
        shadowColor:"black",
        elevation:5
    }
})