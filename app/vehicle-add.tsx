import { Stack } from 'expo-router';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import database from '../api/db';

import {   StyleSheet,
           Text,
           View,
           Image,//ImageBackground,
           Dimensions,
           TextInput,
           Button,
           TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get("window");
const background = require("../assets/images/icon.png");
const mark = require("../assets/images/car.png");
const lockIcon = require("../assets/images/react-logo.png");
const personIcon = require("../assets/images/favicon.png");

export default function addVehicle() {
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carMileage, setCarMileage] = useState(0);
  const navigation = useNavigation();
  //const database = database.fetchUpcoming();

  const addVehicleHandler = () => {
       //setCarMake("Submitted");
       const data = database.addVehicle({
           carMake,
           carModel,
           carYear,
           carMileage
           });
       console.log(data);
       navigation.navigate('vehicles');
      };
  return (
    <View style={styles.container}>
            {/* <ImageBackground source={background} style={styles.background} resizeMode="cover">*/}
              <View style={styles.markWrap}>
                <Image source={mark} style={styles.mark} resizeMode="contain" />
              </View>
              <View style={styles.wrapper}>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carMake}
                    onChangeText={(text) => setCarMake(text)}
                    placeholder="Make"
                    placeholderTextColor="green"
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carModel}
                    onChangeText={(text) => setCarModel(text)}
                    placeholderTextColor="green"
                    placeholder="Model"
                    style={styles.input}
                    // secureTextEntry
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carYear}
                    onChangeText={(text) => setCarYear(text)}
                    placeholderTextColor="green"
                    placeholder="Year"
                    inputMode="numeric"
                    maxLength={4}
                    style={styles.input}
                    // secureTextEntry
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carMileage}
                    onChangeText={(text) => setCarMileage(text)}
                    placeholderTextColor="green"
                    placeholder="Mileage"
                    inputMode="numeric"
                    maxLength={6}
                    style={styles.input}
                    // secureTextEntry
                  />
                </View>
                <TouchableOpacity activeOpacity={.5}>
                  <View>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={addVehicleHandler}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Add Vehicle</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={styles.signupWrap}>
                  <Text style={styles.accountText}>Don't have an account?</Text>
                  <TouchableOpacity activeOpacity={.5}>
                    <View>
                      <Text style={styles.signupLinkText}>Create Account</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            {/*</ImageBackground> */}
          </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    minHeight: 80,
    flex: 1,
  },
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
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});