import { Link } from 'expo-router';
import { useState } from 'react'
import { Button, Image, Dimensions, Pressable, StyleSheet, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import {CustomModal} from '@/components/Modal';
import AppStyles from './AppStyles';
import database from '../api/db';

const { width, height } = Dimensions.get("window");

export default function Account() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showNewAccount,setShowNewAccount] = useState(false);
    const [showLogin,setShowLogin] = useState(false);
    const favIcon = require("../assets/images/favicon.png");

    const createAccount = ()=>{
        const result = database.createUser(name, email, password);
        if(result){

        }
        setShowNewAccount(false);
    }
    const signIn = ()=>{
        const result = database.loginUser(name, email, password);
        if(result){

        }
        setShowLogin(false);
    }

    return  <View style={AppStyles.container}>
                <ScrollView style={[AppStyles.scrollView, AppStyles.subContainer]}>
                    <Text
                        style={AppStyles.screenTitle} >
                        Account
                    </Text>
                    <View style={AppStyles.alignCenter}>
                        <Text></Text>
                        <Text>You don't have an account linked</Text>
                        <Text></Text>
                        <Button title="Sign In" style={AppStyles.button} onPress={()=>setShowLogin(true)}></Button>
                        <Text style={[AppStyles.alignCenter, {marginVertical: 20}]}>Or</Text>
                        <Button title="Create Account" style={AppStyles.button} onPress={()=>setShowNewAccount(true)}></Button>
                    </View>

                    {/* Registration form*/}
                    <CustomModal visible={showNewAccount}>

                        <Text style={AppStyles.label} >Please enter your information:</Text>
                         <View style={styles.inputWrap}>
                          <View style={styles.iconWrap}>
                            <Image source={favIcon} style={styles.icon} resizeMode="contain" />
                          </View>
                          <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Name"
                            placeholderTextColor="#9B835D"
                            style={styles.input}
                          />
                        </View>

                        <View style={styles.inputWrap}>
                          <View style={styles.iconWrap}>
                            <Image source={favIcon} style={styles.icon} resizeMode="contain" />
                          </View>
                          <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Email"
                            placeholderTextColor="#9B835D"
                            style={styles.input}
                          />
                        </View>

                        <View style={styles.inputWrap}>
                          <View style={styles.iconWrap}>
                            <Image source={favIcon} style={styles.icon} resizeMode="contain" />
                          </View>
                          <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Password"
                            placeholderTextColor="#9B835D"
                            style={styles.input}
                            secureTextEntry
                          />
                        </View>
                        <View style={[ AppStyles.flexRow, { justifyContent: 'space-between', marginVertical: 20}]}>
                            <Pressable style={[styles.button, styles.buttonDefault]} onPress={createAccount}>
                                <Text style={AppStyles.buttonText}>Create Account</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.buttonSecond]} onPress={()=>setShowNewAccount(false)}>
                                <Text style={[AppStyles.buttonText]}>Cancel</Text>
                            </Pressable>
                        </View>
                    </CustomModal>

                    {/* Login form*/}
                    <CustomModal visible={showLogin}>
                        <Text style={AppStyles.label}>Please enter you account information</Text>
                        <View style={styles.inputWrap}>
                          <View style={styles.iconWrap}>
                            <Image source={favIcon} style={styles.icon} resizeMode="contain" />
                          </View>
                          <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Email"
                            placeholderTextColor="#9B835D"
                            style={styles.input}
                          />
                        </View>

                        <View style={styles.inputWrap}>
                          <View style={styles.iconWrap}>
                            <Image source={favIcon} style={styles.icon} resizeMode="contain" />
                          </View>
                          <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Password"
                            placeholderTextColor="#9B835D"
                            style={styles.input}
                            secureTextEntry
                          />
                        </View>
                        <View style={[ AppStyles.flexRow, { justifyContent: 'space-between', marginVertical: 20}]}>
                            <Pressable style={[styles.button, styles.buttonDefault]} onPress={signIn}>
                                <Text style={AppStyles.buttonText}>Sign In</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.buttonSecond]} onPress={()=>setShowLogin(false)}>
                                <Text style={[AppStyles.buttonText]}>Cancel</Text>
                            </Pressable>
                        </View>
                    </CustomModal>
                </ScrollView>
            </View>
}

const styles = StyleSheet.create({
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,

  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      minWidth: '45%',
    },
    buttonSecond: {
      backgroundColor: '#8C837B',
    },
    buttonDefault: {
      backgroundColor: '#4480A6',
    },
});