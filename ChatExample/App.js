import  React, {useEffect} from "react";
import {Text} from "react-native";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatList from "./screens/ChatList";
import Settings from './screens/Settings';
import Chat from './screens/Chat';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import {Ionicons} from '@expo/vector-icons';
import { Provider } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0kR2UO8z_2r3cWw6WXuoPZW6odBJOoVA",
  authDomain: "example-app-34f25.firebaseapp.com",
  projectId: "example-app-34f25",
  storageBucket: "example-app-34f25.appspot.com",
  messagingSenderId: "391542047440",
  appId: "1:391542047440:web:6648566772e29ca5c9d4d5"
};

firebase.initializeApp(firebaseConfig);

const Stack=createNativeStackNavigator();
const Tabs=createBottomTabNavigator();

const TabsNavigator= () => {
  //Kullanıcı girişi kontrolü
  const navigation= useNavigation();
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        navigation.navigate("SignUp");
      }
    });
 
  },
  []);
  return(
    <Tabs.Navigator
      screenOptions={({route})=> ({
        tabBarIcon:({focused, color,size})=>{
          return(
            <Ionicons
            name={route.name==="ChatList"? "chatbubbles":"settings"}
            color={color}
            size={size}
            />
          );
        },
      })}
>
  <Tabs.Screen name="ChatList" component={ChatList}/>
  <Tabs.Screen name="Settings" component={Settings}/>

</Tabs.Navigator>
  );
};
const App=() =>{
  return(
    <NavigationContainer>
      <Provider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabsNavigator} 
        options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
export default App;