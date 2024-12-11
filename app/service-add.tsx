import { Link } from 'expo-router';
import { useState, useRef  } from 'react'
import { Button, Image, StyleSheet, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import database from '../api/db';
import AppStyles from './AppStyles';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function addVehicleService() {
    const personIcon = require("../assets/images/favicon.png");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [serviceDate, setServiceDate] = useState("");
    const [serviceDateObject, setServiceDateObject] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const serviceIcon = require("../assets/images/wrench.png");
    console.log("==== Add Service Screen ===");
    console.log("For Vehicle ID: " + route.params.id);
    const vehicle = database.fetchVehicle(route.params.id);;
    const saveService = ()=> {
        console.log("Saving: " + vehicle.id);
        database.addService(vehicle.id,
            {
            description,
            serviceDate,
            cost,
            mileage
            })
        navigation.navigate('vehicle-detail', { id: vehicle.id });
    }
    const updateDate = (e, d) => {
        //console.log(e);
        //console.log(d);
        setShowCalendar(false);
        setServiceDate(d.toLocaleString().split(",")[0]);
        setServiceDateObject(d);

        //setServiceDate(date);
    }

    console.log(vehicle);
    //console.log(navigation.params?.id);
    return (
        <View style={AppStyles.container}>

                <View style={AppStyles.markWrap}>
                    <Image source={serviceIcon} style={styles.mark} resizeMode="contain" />
                 </View>
                 <View style={AppStyles.formWrapper}>
                    <Text style={{ textAlign: 'center'}}>Please enter your vehicle's service information</Text>
                    {/*<View>
                        <Text>
                            Service for:
                        </Text>
                        <Text style={AppStyles.carItemTitle}>
                            {vehicle.carMake} {vehicle.carModel} ({vehicle.carYear})
                        </Text>
                        <Text></Text>
                    </View>*/}
                    <View style={styles.inputWrap}>
                      <View style={styles.iconWrap}>
                        <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                      </View>
                      <TextInput
                        value={serviceDate}
                        onChangeText={(text) => setServiceDate(text)}
                        onFocus={(e)=>{e.currentTarget.blur(); setShowCalendar(true); }}
                        placeholder="Date of service"
                        placeholderTextColor="#9B835D"
                        style={styles.input}
                        inputMode={'none'}
                      />
                        {showCalendar && (<DateTimePicker
                            value={serviceDateObject}
                            onChange={updateDate}
                            onError={()=>console.log("cancelled")}
                        />)}
                    </View>
                    <View style={styles.inputWrap}>
                      <View style={styles.iconWrap}>
                        <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                      </View>
                      <TextInput
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Description of the service"
                        placeholderTextColor="#9B835D"
                        style={styles.input}
                       />
                    </View>
                    <View style={styles.inputWrap}>
                      <View style={styles.iconWrap}>
                        <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                      </View>
                      <TextInput
                        value={cost}
                        onChangeText={(text) => setCost(text)}
                        placeholder="Cost"
                        placeholderTextColor="#9B835D"
                        style={styles.input}
                        inputMode="numeric"
                       />
                    </View>
                    <View style={styles.inputWrap}>
                      <View style={styles.iconWrap}>
                        <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                      </View>
                      <TextInput
                        value={mileage}
                        onChangeText={(text) => setMileage(text)}
                        placeholder="Mileage"
                        placeholderTextColor="#9B835D"
                        style={styles.input}
                        inputMode="numeric"
                       />
                    </View>
                    <Text></Text>
                <TouchableOpacity activeOpacity={.5} onPress={saveService}>
                  <View style={AppStyles.button}>
                    <Text style={AppStyles.buttonText}>Save Service</Text>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    markWrap: {
        flex: 2,
        paddingVertical: 10,
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
    inputWrap: {
      flexDirection: "row",
      marginVertical: 10,
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: "#CCC"
    },
    mark: {
     width: null,
     height: null,
     minHeight: 80,
     maxHeight: 150,
     flex: 1,
    },

  });