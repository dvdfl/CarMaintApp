import { Link } from 'expo-router';
import { Button, StyleSheet, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchListItem } from '@/components/ListItem';
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
                <View style={AppStyles.subContainer}>
                    {database.fetchVehicles().map((car) => {
                                 return  (
                                     <TouchListItem itemKey={car.id}
                                            itemStyle={AppStyles.carItem}
                                            titleStyle={ AppStyles.carItemTitle }
                                            touchHandler={onPress}
                                            titleText = {car.carMake + ' ' + car.carModel + ' (' + car.carYear +')'}
                                            subText = {car.carMileage + ' mi'}
                                        >
                                     </TouchListItem>
                                 );
                               })}
                </View>
           </ScrollView>
           <Link href="vehicle-add" style={ AppStyles.button }> Add Vehicle </Link>

        </View>
    );
}
