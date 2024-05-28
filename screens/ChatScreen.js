import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback,Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {Avatar} from "react-native-elements"
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"
import 'react-native-get-random-values'
import { useRef } from 'react'
import { nanoid } from 'nanoid'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayUnion, doc, Timestamp, updateDoc ,orderBy, query, where, onSnapshot, collection, serverTimestamp} from 'firebase/firestore'
import { auth ,db} from '../firebase'
import { FirebaseError } from 'firebase/app'




const ChatScreen = ({navigation,route}) => {

  const [input,setInput]=useState('')
  const [messages,setMessages]=useState([])

  const scrollViewRef = useRef();

  useEffect(()=>{
    if(Platform.OS==="web")
    scrollViewRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

  const sendMsg=async()=>{

    Keyboard.dismiss()

    

    updateDoc(doc(db,"messages",route.params.id),{ 

      messages:arrayUnion({
        id:nanoid(),
        text : input ,
        name:auth.currentUser.displayName,
        img:auth.currentUser.photoURL,
        senderId : auth.currentUser.uid,
        date:Timestamp.now()

      })

    })


    await updateDoc(doc(db,"chats",route.params.id),
    {
      lastMessage:  input,
      date:serverTimestamp(),
      from :auth.currentUser.displayName,
      img:auth.currentUser.photoURL
      }
      
    )

    
    setInput('')
 
  }

    useLayoutEffect(()=>{
        navigation.setOptions({
      
           headerTitleAlign:"left",
           headerTitle:() => (
            <View style={{
              flexDirection:"row",
             alignItems:"center"
            }}>
              <Avatar
              rounded
              source={{
                uri:route.params.img
              }}
              />
                 <Text style={{
                  color:"white",
                  marginLeft:10,
                  fontWeight:"700"
                  
                 }}>{route.params.chatName}</Text>
            </View>
           )
           ,
           headerLeft:()=>(
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{marginLeft:10}}
          >
            <AntDesign name='arrowleft' size={24} color="white"/>
          </TouchableOpacity>
           )
           ,headerRight:()=>(
            <View
              style={{
                flexDirection:"row",
                marginRight:20,
                justifyContent:"space-around",
                width:80
              }}
            >
              <TouchableOpacity>
                <AntDesign name='videocamera' size={24} color="white"/>
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name='phone' size={24} color="white"/>
              </TouchableOpacity>
            </View>
           )

        })
       
    },[navigation,messages])

    useEffect(()=>{


      const colRef =doc(db,"messages",route.params.id)


        const unsub = onSnapshot(colRef,(doc)=>{  
          doc.exists()&& setMessages(
           doc.data().messages
          )
        })
     
      return ()=>{unsub ()}
    },[])


  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white",

    }}>
      <StatusBar style='light'/>
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style={styles.countainer}
      keyboardVerticalOffset={90}
     >
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <>
    

          <ScrollView  contentContainerStyle={{paddingTop:15}} ref={Platform.OS==='android' || Platform.OS==='ios' ? scrollViewRef:null} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            {messages?.map(m=>(
              m.senderId===auth.currentUser.uid ? 

              <View key={m.id} style={styles.reviever}   ref={Platform.OS==='web'? scrollViewRef:null}>
                <Avatar rounded source={{uri:m.img}} size={30} position="absolute" bottom={-15} right={-5}/>
                <Text style={styles.reciverText} >{m.text}</Text>
                </View> 
                
                
                
                :


              <View  key={m.id} style={styles.sender} >
              <Avatar rounded source={{uri:m.img}} size={30} position="absolute" bottom={-15} left={-5}/>
              <Text style={styles.senderText} k>{m.text}</Text>
              <Text >{m.name}</Text>
              </View>
            ))}


          </ScrollView>

          <View style={styles.footer}>
                <TextInput placeholder='Signals Message' style={styles.input} onChangeText={(text)=>setInput(text)} value={input} onSubmitEditing={sendMsg}/>
                <TouchableOpacity onPress={sendMsg}>
                  <Ionicons name="send" size={24} color="#2b68e6"/>
                </TouchableOpacity>
          </View>
        </>
        </TouchableWithoutFeedback>
     </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({

  countainer:{
      flex:1
  },
  footer:{
      flexDirection:"row",
      alignItems:"center",
      width:"100%",
      padding:15
  },
  input:{
    buttom:0,
    height:40,
    flex:1,
    marginRight:15,
    backgroundColor:"#ececec"
    ,color:"gray",
    borderRadius:30,
    padding:10

  },
  reviever:{
    padding:15,
    backgroundColor:"#ececec",
    alignSelf:"flex-end",
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative"
  },
  sender:{
    padding:15,
    backgroundColor: "#2b68e6",
    alignSelf:"flex-start",
    maxWidth:"80%",
    borderRadius:20,
    margin:15,
    position:"relative"
  },
  senderText:{
      color:"white",
      fontWeight:"500",
      marginLeft:15,
      marginBottom:15
  },
  reciverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:15,
  }
})