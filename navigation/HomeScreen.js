import React, { Component } from 'react';
import { View, Text,TouchableOpacity ,StyleSheet} from 'react-native';
import {Icon} from "native-base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInScreen from "./SigInScreen";
import SignUpScreen from "./SignUpScreen";


const Tab = createMaterialTopTabNavigator();

export default function HomeScreen ({navigation}){
  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(<TouchableOpacity onPress={()=>{navigation.navigate("Admin")}}><View style={styles.container}><Icon name="person-circle-outline" size={1} style={styles.person}></Icon><Text style={styles.adminText}>Admin</Text></View></TouchableOpacity>)
    })
  },[navigation]);
    return (
      <Tab.Navigator>
      <Tab.Screen name="SignUp" component={SignUpScreen} />
      <Tab.Screen name="SignIn" component={SignInScreen} />
      </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adminText:{
    paddingRight:20,
    paddingTop:20,
    fontFamily:'Roboto-Bold',
    fontSize:16
  },
  person:{
    color:"#0D0D0D",
    paddingTop:15,
  }
});