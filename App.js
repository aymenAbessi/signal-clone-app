import "react-native-gesture-handler"
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
const Stack=createStackNavigator();

const globalScreenOption ={
  headerTitleAlign: 'center',
  backTitleVisible:true,
  headerStyle:{backgroundColor:"#2c6bed"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white"
}

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOption}>    
          <Stack.Screen name="Login page" component={Login}/>
          <Stack.Screen name="Register page" component={Register}/>
          <Stack.Screen name="Home page" component={Home}/>
          <Stack.Screen name="Add chat page" component={AddChatScreen}/>
          <Stack.Screen name="Chat" component={ChatScreen}/>
       </Stack.Navigator>


    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
