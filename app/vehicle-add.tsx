import { Stack } from 'expo-router';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import database from '../api/db';
import AppStyles from './AppStyles'

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
const carIcon = require("../assets/images/car.png");
const reactLogo = require("../assets/images/react-logo.png");
const favIcon = require("../assets/images/favicon.png");

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
    <View style={AppStyles.container}>
            {/* <ImageBackground source={background} style={styles.background} resizeMode="cover">*/}
              <View style={AppStyles.markWrap}>
                <Image source={carIcon} style={AppStyles.mark} resizeMode="contain" />
              </View>
              <View style={styles.wrapper}>
                <Text style={{ textAlign: 'center'}}>Please enter your vehicle information</Text>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={favIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carMake}
                    onChangeText={(text) => setCarMake(text)}
                    placeholder="Make"
                    placeholderTextColor="#9B835D"
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={reactLogo} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carModel}
                    onChangeText={(text) => setCarModel(text)}
                    placeholderTextColor="#9B835D"
                    placeholder="Model"
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={reactLogo} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carYear}
                    onChangeText={(text) => setCarYear(text)}
                    placeholderTextColor="#9B835D"
                    placeholder="Year"
                    inputMode="numeric"
                    maxLength={4}
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={reactLogo} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    value={carMileage}
                    onChangeText={(text) => setCarMileage(text)}
                    placeholderTextColor="#9B835D"
                    placeholder="Mileage"
                    inputMode="numeric"
                    maxLength={6}
                    style={styles.input}
                  />
                </View>
                <TouchableOpacity activeOpacity={.5} onPress={addVehicleHandler}>
                  <View style={AppStyles.button}>
                    <Text style={AppStyles.buttonText}>Add Vehicle</Text>
                  </View>
                </TouchableOpacity>
              </View>

          </View>
    );
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
});