import { KeyboardAvoidingView, StyleSheet,  View } from 'react-native'
import {  createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import React, { useLayoutEffect, useState } from 'react'
import { Button,Input,Text } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth,db } from '../firebase'
import { doc,setDoc } from 'firebase/firestore';

const Register = ({navigation}) => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [imgUrl,setImgUrl]=useState("")

    useLayoutEffect(()=>{
                navigation.setOptions({
                    headerBackTitle:"fff ",
                    headerBackVisible:true
                })
    },[navigation])

    const register = async() =>{


           
    try{
        const res=await createUserWithEmailAndPassword(auth, email, password)
        
              
                 await updateProfile(res.user,{
                    displayName:name,
                    photoURL:imgUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                 })

                
  
     
      }catch(e){
      alert(e.message)
      }

           
    }

  return (
    <KeyboardAvoidingView style={styles.countainer}>
        <StatusBar style='light'/>
      <Text h3 style={{marginBottom:50}}>Create signals acount</Text>

      <View style={styles.inputCountianer} >
            <Input placeholder='full name' autoFocus type='text' onChangeText={(text)=>setName(text)} value={name}/>
            <Input placeholder='email'  type='email' onChangeText={(text)=>setEmail(text)} value={email}/>
            <Input placeholder='password'   secureTextEntry type='password' onChangeText={(text)=>setPassword(text)} value={password}/>
            <Input placeholder='Profile pic url'  type='text' onChangeText={(text)=>setImgUrl(text)} value={imgUrl} onSubmitEditing={register}/>
      </View>
      <Button title='Register' raised onPress={register} containerStyle={styles.button}/>
    
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
    countainer:{
        flex:1,
            alignItems:'center',
            justifyContent:'center',
            padding:10,
            backgroundColor:'white'
    },
    inputCountianer:{
            width:300
    },
    button:{
        marginTop:10,
        width:200
    },



})