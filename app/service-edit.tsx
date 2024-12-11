import { Link } from 'expo-router';
import { useState, useRef  } from 'react'
import { Button, Image, StyleSheet, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import database from '../api/db';
import AppStyles from './AppStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function addVehicleService() {
    const personIcon = require("../assets/images/favicon.png");
    const serviceIcon = require("../assets/images/wrench.png");
    const route = useRoute();
    const navigation = useNavigation();

    const service = database.fetchService(route.params?.id);
    const [month, day, year] = service.serviceDate.split('/').map(Number);
    const serviceDateObj = new Date(year, month - 1, day);

    const [description, setDescription] = useState(service.description);
    const [cost, setCost] = useState(service.cost);
    const [mileage, setMileage] = useState(service.mileage);
    const [serviceDate, setServiceDate] = useState(service.serviceDate);
    const [serviceDateObject, setServiceDateObject] = useState(serviceDateObj);
    const [showCalendar, setShowCalendar] = useState(false);


    console.log("=== Service edit ===");
    console.log(route.params?.id);
    console.log(service);

    const updateService = ()=> {
        console.log("Saving: " + service.id);
        database.updateService(
            {
            id: service.id,
            description,
            serviceDate,
            cost,
            mileage
            })
        navigation.navigate('service-detail', { id: service.id });
    }
    const updateDate = (e, d) => {
        //console.log(e);
        //console.log(d);
        setShowCalendar(false);
        setServiceDate(d.toLocaleString().split(",")[0]);
        setServiceDateObject(d);

        //setServiceDate(date);
    }

    return (
            <View style={AppStyles.container}>

                    <View style={AppStyles.markWrap}>
                        <Image source={serviceIcon} style={styles.mark} resizeMode="contain" />
                     </View>
                     <View style={AppStyles.formWrapper}>
                        <Text style={{ textAlign: 'center'}}>Please update your vehicle's service information</Text>
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
                    <TouchableOpacity activeOpacity={.5} onPress={updateService}>
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