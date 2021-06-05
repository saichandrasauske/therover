import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import HomeScreen from "./navigation/HomeScreen";
import CameraScreen from "./navigation/CameraScreen";
import SigInScreen from "./navigation/SigInScreen";
import AdminScreen from "./navigation/AdminScreen";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBOgtKqwB9yPdcybE4nQ1wC_wq1mnx-bEA",
  authDomain: "flash-physics-227415.firebaseapp.com",
  projectId: "flash-physics-227415",
  storageBucket: "flash-physics-227415.appspot.com",
  messagingSenderId: "533935232165",
  appId: "1:533935232165:web:87facb673e35870ef0294c",
  measurementId: "G-BYD1L36YBT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded:false,
    };
  }
  async loadFonts(){
    await Font.loadAsync({
      'Roboto-Light':require("./assets/font/Roboto-Light.ttf"),
      'Roboto-Bold':require('./assets/font/Roboto-Bold.ttf'),
    });
    this.setState({fontLoaded:true})
  }

  componentDidMount(){
    this.loadFonts();
  }
  render(){
    if(this.state.fontLoaded){
  return(
    <NavigationContainer>
    <Stack.Navigator style={styles.container} >
      <Stack.Screen name="Welcome" component={HomeScreen} options={({navigation,route})=>({headerTitle:"Welcome",headerTitleStyle:{ fontFamily:'Roboto-Bold',
      fontSize:16}})}/>
      <Stack.Screen name ="Cities" component={CameraScreen} options={{headerTitle:"Cities",headerLeft:()=>null,headerTitleStyle:{ fontFamily:'Roboto-Bold',
      fontSize:16}}}/>
      <Stack.Screen name ="SignIn" component={SigInScreen} />
      <Stack.Screen name ="Admin" component={AdminScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
 }
 else{
   return null;
 }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:'Roboto-Bold',
    fontSize:16
  },
});
