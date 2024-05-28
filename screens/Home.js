import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItems from '../components/CustomListItems'
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"
import { doc, getDocs } from 'firebase/firestore'
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { Avatar, Button } from 'react-native-elements'
import { signOut } from 'firebase/auth'
import {auth,db} from '../firebase'
import { StatusBar } from 'expo-status-bar'

const Home = ({navigation}) => {

  const [chats,setChats]=useState([])

  useEffect(()=>{

    
const q = query(collection(db, "chats"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {


 var arr=[]
  
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    arr.push({
      id:doc.id,
          data:doc.data().chatName
          ,lastMessage:doc.data().lastMessage,
          from:doc.data().from,
          img:doc.data().img
    })
    
  

  
  });
  setChats(arr)

});


   
  },[])

 

  const signout= async()=>{
   const res=await signOut(auth)
   navigation.replace('Login page')
  }

useLayoutEffect(()=>{
  navigation.setOptions({
    title:'signals',
    headerStyle:{backgroundColor:"white"},
    headerTitleStyle:{color:"black"},
    headerTintColor:"black",
    headerLeft: () => (
   
      <View style={{marginLeft:20}}>
        <TouchableOpacity>
      <Avatar
      rounded
        source={{uri :auth?.currentUser?.photoURL}}
        onPress={signout}
      />
      </TouchableOpacity>
    </View>
  
    ),
    headerRight: () => (
   
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        width:80,
        marginRight:20}}>

        <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='edit' size={24} color="black" onPress={()=>navigation.navigate('Add chat page')}/>
        </TouchableOpacity>
       
      </View>
  
    ),
   


   
 
  })
},[navigation])

  return (
    <SafeAreaView>
       <StatusBar style='auto'/>
      <ScrollView style={styles.countainer}>
        {chats?.map(({data,id,lastMessage,from,img})=>(
                <CustomListItems lastMessage={lastMessage} img={img} from={from} key={id} id={id} chatName={data} navigation={navigation}/>
        ))}
      
      </ScrollView>
     
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  countainer:{
    height:"100%"
  }
})