import { Link } from 'expo-router';
import { StyleSheet, ScrollView, Text, TouchableHighlight, View, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import database from '../api/db';
import AppStyles from './AppStyles'

export default function Vehicles() {
    const navigation = useNavigation();
    const onPress = (id)=> {
        console.log("touched: " + id.toString());
        navigation.navigate('vehicle-detail', { id: id });
    }
    return (
        <View style={AppStyles.container}>
           <ScrollView style={AppStyles.scrollView}>
                <View>
                   {database.fetchVehicles().map((car) => {
                     return  (
                         <TouchableHighlight
                            key={car.id}
                            onPress={() => onPress(car.id)}
                            style={AppStyles.carItem}>
                            <View>
                                <Text style={ AppStyles.carItemTitle }>
                                    {car.carMake} {car.carModel} ({car.carYear})
                                </Text>
                                <Text>{car.carMileage} mi</Text>
                            </View>
                         </TouchableHighlight>
                     );
                   })}
                </View>
                <Text></Text>
                <Link href="vehicle-add" style={ AppStyles.button }> Add Vehicle </Link>
           </ScrollView>
        </View>
    );
}
