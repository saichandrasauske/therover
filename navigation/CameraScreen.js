import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right,Button } from 'native-base';
import * as firebase from "firebase";

const image = {uri:"https://images.pexels.com/photos/2996306/pexels-photo-2996306.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"};

export default class CameraScreen extends Component {

   static navigationOptions = {
      title: "Home", 
      headerLeft:()=> null
    };

    SignOut =()=>{
       firebase
       .auth()
       .signOut()
       .then(()=>{
         this.props.navigation.navigate('Welcome')
       })
       .catch((err)=>{
          alert(err.message)
       })
    }
  

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground style={styles.image} source={image}>
      <Content>
          <Card>
            <CardItem>
              <Text style={styles.placesText}>Camera to Scan</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem>
              <Text style={styles.placesText}>Show Postings</Text>
             </CardItem>
           </Card>
        </Content>
        <Button full dark
        onPress={() => {
         this.SignOut()
      }}
         ><Text style={styles.text}>Logout</Text></Button>
      </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column"
  },
  image: {
    flex:1,
    resizeMode: "cover",
    justifyContent:"center"
  },
   text:{
      color:"#fff",
       fontFamily:'Roboto-Light',
      fontSize:16
   },
   placesText:{
    fontFamily:'Roboto-Bold',
    fontSize:16
   }

 });