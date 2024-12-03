import { Link } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, ScrollView, Text, TextInput,
    TouchableHighlight, View, TouchableOpacity, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import database from '../api/db';
import AppStyles from './AppStyles'
const { width, height } = Dimensions.get("window");

export default function viewVehicle() {
    const route = useRoute();
    const navigation = useNavigation();
    const mark = require("../assets/images/car.png");
    const personIcon = require("../assets/images/favicon.png");
    const lockIcon = require("../assets/images/react-logo.png");

    const vehicle = database.fetchVehicle(route.params.id);
    const [carMake, setCarMake] = useState(vehicle.carMake);
    const [carModel, setCarModel] = useState(vehicle.carModel);
    const [carYear, setCarYear] = useState(vehicle.carYear);
    const [carMileage, setCarMileage] = useState(vehicle.carMileage);

    console.log("=== Vehicle Edit ===");
    console.log("Vehicle ID: " + route.params?.id);
    console.log(vehicle);
  const addVehicleHandler = () => {
       //setCarMake("Submitted");
       const data = database.updateVehicle({
           id: vehicle.id,
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
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={AppStyles.formWrapper}>
            <Text style={{ textAlign: 'center'}}>Please update your vehicle information</Text>
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
            <TouchableOpacity activeOpacity={.5} onPress={addVehicleHandler}>
              <View style={AppStyles.button}>
                <Text style={AppStyles.buttonText}>Update Vehicle</Text>
              </View>
            </TouchableOpacity>
          </View>
        {/*</ImageBackground> */}
      </View>
    );
}

const styles = StyleSheet.create({

  mark: {
    width: null,
    height: null,
    minHeight: 80,
    maxHeight: 150,
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
});