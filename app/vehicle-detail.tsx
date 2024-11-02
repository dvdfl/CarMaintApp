import { Link } from 'expo-router';
import { StyleSheet, ScrollView, Text, TouchableHighlight, View, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import database from '../api/db';
import AppStyles from './AppStyles'

export default function viewVehicle() {
    const route = useRoute();
    const navigation = useNavigation();
    const vehicle = database.fetchVehicle(route.params.id);
    console.log("=== vehicle detail ===");
    console.log("Vehicle ID: " + route.params?.id);
    console.log(vehicle);
    const onPress = (id)=> {
        console.log("detail to add service: " + id.toString());
        navigation.navigate('service-detail', { id: id });
    }
    return (
        <View style={AppStyles.container}>
           <ScrollView style={AppStyles.scrollView}>
                <View>
                    <Text
                        style={AppStyles.screenTitle} >
                        {vehicle.carMake} {vehicle.carModel} ({vehicle.carYear})
                    </Text>
                    <Text>
                        Mileage: {vehicle.carMileage}
                    </Text>
                </View>
                <Text></Text>
               {vehicle.services.map((service) => {
                 return  (
                     <TouchableHighlight
                        key={service.id}
                        onPress={() => onPress(service.id)}
                        style={AppStyles.carItem}>
                        <View>
                            <Text style={ AppStyles.carItemTitle }>
                                 {service.description}
                            </Text>
                            <Text>Performed on {service.serviceDate}</Text>
                        </View>
                     </TouchableHighlight>
                 );
               })}

                <Text></Text>
                <Link
                    href={{ pathname: './service-add', params: { id: vehicle.id}}}
                    style={ AppStyles.button }
                    >
                    <Text>Add Service</Text>
                </Link>
                <Text></Text>

                <Link
                    href={{ pathname: './vehicle-edit', params: { id: vehicle.id}}}
                    style={ AppStyles.button }
                    >
                    <Text>Edit Vehicle</Text>
                </Link>
                <Text></Text>

           </ScrollView>
        </View>
    );
}