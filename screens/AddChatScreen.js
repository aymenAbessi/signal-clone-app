import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import 'react-native-get-random-values'
import {AntDesign} from "@expo/vector-icons"
import {nanoid} from "nanoid"
import {auth,db} from "../firebase"
import { addDoc, arrayUnion, doc, collection, updateDoc, setDoc } from 'firebase/firestore'



const AddChatScreen = ({navigation}) => {



    const [input,setInput]=useState('')

    const createChat=async()=>{
    
      var id=nanoid()
      try{  await  setDoc(doc(db, "chats", id), {
        chatName:input,
        id:id,
        lastMessage:"",
        date:"",
        from :"",
        img:auth.currentUser.photoURL
      });
         


          
          
            setDoc(doc(db, "messages",id),{ 

            })
         
        

          navigation.goBack();}
          catch (e){
          alert(e.message)
          }
    }

useLayoutEffect(()=>{
    navigation.setOptions({
        title:"Add a new Chat"
    })
},[navigation])

  return (
    <View style={styles.countainer}>
      <Input 
      placeholder='Enter a chat name'
      onChangeText={(text)=>setInput(text)}
      value={input}
      leftIcon={
        <AntDesign name='message1' size={24} color="black" onPress={()=>navigation.navigate('Add chat page')}/>

      }
      />
      <Button disabled={!input} title='Create chat' onPress={createChat} />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({

    countainer:{
            backgroundColor:"white",
            padding:30,
            height:"100%"
    }
})