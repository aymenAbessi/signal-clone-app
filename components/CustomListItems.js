import { StyleSheet, Text, View } from 'react-native'
import { Avatar,ListItem } from 'react-native-elements'
import React from 'react'

const CustomListItems = ({id,chatName,lastMessage,navigation,from,img}) => {

  const enterChat =()=>{
      navigation.navigate('Chat',{
        id,chatName,img
      })
  }

  return (
    <ListItem  bottomDivider onPress={enterChat}>
        <Avatar
                rounded
                source={{
                    uri:img
                }}
              
        />
        <ListItem.Content >
            <ListItem.Title style={{fontWeight:'800'}}>{chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{from +": "+ lastMessage}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItems

const styles = StyleSheet.create({})