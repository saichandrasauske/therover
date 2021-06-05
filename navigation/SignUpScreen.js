import React, { Component } from 'react';
import { StyleSheet,View, Text,KeyboardAvoidingView,TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { Form, Item, Input, Label, Button ,Icon} from "native-base";
import ValidationComponent from 'react-native-form-validator';

import * as firebase from "firebase";
export default class SignUpScreen extends ValidationComponent {

  
  
  constructor(props) {
    super(props);
    this.state = {
      displayName:'',
       name:"",
       phonenumber:"",
       email:"",
       password:"",
       confirmPassword:"",
       hidePass:true,
       loading:false
    };
  }

  handleSubmit(name,email,phonenumber,password,confirmPassword){
    if (password !== confirmPassword) {
          alert("Passwords don't match");
          console.log(name,number,email,password);
      } 
    else if(this.validate({
      name: {minlength:3, maxlength:7, required: true},
      email: {email: true,required:true},
      phonenumber: {minlength:10,maxlength:10,required:true},
    })){
      this.setState({
        loading:true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(authenticate=>{
        authenticate.user.updateProfile({
          displayName:this.state.displayName
        })
        this.setState({
       name:"",
       phonenumber:"",
       email:"",
       password:"",
       confirmPassword:"",
       loading:false
        })
          this.props.navigation.navigate("Cities");
      })
      .catch(err=>{
        alert(err.message)
      })
    }
  }

securePass= ()=>{
  this.setState({hidePass:!this.state.hidePass})
 }


  render() {
    if(this.state.loading){
      return(
        <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0D0D0D" />
        </View>
      )
    }
    else{
      return (
      <ScrollView  style={styles.container}>
      <KeyboardAvoidingView  style={styles.container}
      behavior="position"
      enabled>
      <View style={styles.logoContainer}>
      
      <View style={styles.error}>
       <Text style={styles.errortext}>
            {this.getErrorMessages()}
          </Text>
       </View>
       <Form style={styles.form}>
         <Item regular  style = {styles.item}>
           <Input
             ref="name"
             autoCorrect={false}
             autoCapitalize="none"
             placeholder="Name"
             keyboardType="name-phone-pad"
             onChangeText={name => this.setState({ name })}
           />
         </Item>
         <Item regular  style = {styles.item}>
         <Input
           ref="phonenumber"
           autoCorrect={false}
           autoCapitalize="none"
           placeholder="Phone Number"
           keyboardType="numeric"
           onChangeText={phonenumber => this.setState({ phonenumber })}
         />
       </Item>
         <Item regular  style = {styles.item}>
           <Input
             ref="email"
             autoCorrect={false}
             autoCapitalize="none"
             keyboardType="email-address"
             placeholder="Email"
             onChangeText={email => this.setState({ email })}
           />
         </Item>

         <Item regular  style = {styles.item}>
           <Input
             autoCorrect={false}
             autoCapitalize="none"
             keyboardType="name-phone-pad"
             placeholder="password"
             secureTextEntry={this.state.hidePass}
             onChangeText={password => this.setState({ password })}
           />
           <Icon
              name={this.state.hidePass?'eye':'eye-off-outline'}
              size={15}
              color="grey"
              onPress={()=>{this.securePass()}}
            />
         </Item>
         <Item regular  style = {styles.item}>
           <Input
             autoCorrect={false}
             autoCapitalize="none"
             placeholder="confirm password"
             keyboardType="name-phone-pad"
             secureTextEntry={this.state.hidePass}
             onChangeText={confirmPassword => this.setState({ confirmPassword })}
           />
         </Item>
         <Button
           style={styles.button}
           full
           rounded
           dark
           onPress={() => {
              this.handleSubmit(
                 this.state.name,
                 this.state.email,
                 this.state.phonenumber,
                 this.state.password,
                 this.state.confirmPassword,
                 )
           }}
         >
           <Text style={styles.buttonText}>Sign Up</Text>
         </Button>
         <Button
           style={styles.button}
           full
           dark
           rounded>
           <Text style={styles.buttonText}>Continue With Google</Text>
         </Button>
         
       </Form>
       <View style={styles.footer}>
         <Text style={styles.licence}>By Clicking Create An Account You Agree to Our Terms and Services</Text>
       </View>
      </View>

       
       
      </KeyboardAvoidingView>
      </ScrollView>
    );
    }
  }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff"
   },
   logoContainer: {
     alignItems: "center",
     marginTop: 50,
     marginBottom: 20
   },
   item:{
      margin:10,
   },
   form: {
     padding: 20,
     width: "100%"
   },
   button: {
     marginTop: 20
   },
   buttonText: {
     color: "#fff",
     fontFamily:'Roboto-Light',
     fontSize:16
   },
   footer: {
     alignItems: "center"
   },
   licence:{
    padding:10,
    textAlign:'center',
    fontFamily:'Roboto-Light',
    fontSize:16
   },
   error:{
     alignItems:"center",
     justifyContent:"center"
   },
   errortext:{
     color:"#BF3325"
   },
   loading: {
     left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
 });