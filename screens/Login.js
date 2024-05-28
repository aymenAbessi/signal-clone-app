import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { Button,Input,Image } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
const Login = ({navigation}) => {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")


useEffect(()=>{

   const unsub= auth.onAuthStateChanged((authUser)=>{
   
                if(authUser){ 
                    navigation.replace('Home page')
                }
        })

    return unsub
},[])


const signIn = async()=>{

  try{
    const res=await signInWithEmailAndPassword(auth, email, password)
       
    
          
         
  }catch(e){
    alert(e.message)
  }
}

  return (
    <KeyboardAvoidingView behavior='height' style={styles.countainer}>

        <StatusBar style='light'/>
      <Image source={{
        uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/2048px-Signal-Logo.svg.png"
      }}
      style={{
        width:120,
        height:120
      }}
      />
    
      <View style={styles.inputCountainer}>
        <Input placeholder='Email' type='email' value={email} onChangeText={(text)=>setEmail(text)}/>
        <Input placeholder='password' secureTextEntry type="password" value={password} onChangeText={(text)=>setPassword(text)}/>   
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title='Login'/>
      <Button containerStyle={styles.button} onPress={()=>navigation.navigate('Register page')} type={'outline'} title='Register'/>
      <View style={{height:100}}/>
    </KeyboardAvoidingView>
   
  )
}

export default Login

const styles = StyleSheet.create({
    countainer:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            padding:10,
            backgroundColor:'white'
            
    },

    inputCountainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    },
})