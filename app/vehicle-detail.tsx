import { Link } from 'expo-router';
import { Button, Image, StyleSheet, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import { TouchListItem } from '@/components/ListItem';
import database from '../api/db';
import AppStyles from './AppStyles'

export default function viewVehicle() {
    const route = useRoute();
    const navigation = useNavigation();
    const vehicle = database.fetchVehicle(route.params.id);
    const editIcon = require("../assets/images/edit-icon.png");

    console.log("=== vehicle detail ===");
    console.log("Vehicle ID: " + route.params?.id);
    console.log(vehicle);
    const onPress = (id)=> {
        console.log("detail to add service: " + id);
        navigation.navigate('service-detail', { id: id });
    }
    return (
        <View style={AppStyles.container}>
           <ScrollView style={[AppStyles.scrollView, AppStyles.subContainer]}>
                <View>
                    <View style={AppStyles.flexRow}>
                        <Text
                            style={[AppStyles.screenTitle, { flex: 5}]} >
                            {vehicle.carMake} {vehicle.carModel} ({vehicle.carYear})
                        </Text>
                        <Link
                            href={{ pathname: './vehicle-edit', params: { id: vehicle.id}}}
                          >
                            <View style={[AppStyles.iconWrap, { flex: 1, marginTop: 5}]}>
                                    <Image source={editIcon} style={AppStyles.icon30} resizeMode="contain" />
                            </View>
                        </Link>
                     </View>
                    <Text>
                        Mileage: {vehicle.carMileage}
                    </Text>
                </View>
                <Text></Text>
               {vehicle.services.map((service) => {
                 return  (
                     <TouchListItem key={service.id} itemKey={service.id}
                             itemStyle={AppStyles.carItem}
                             titleStyle={ AppStyles.carItemTitle }
                             touchHandler= {onPress}
                             titleText = {service.description}
                             subText = {' Performed on' + service.serviceDate }
                         >
                      </TouchListItem>
                 );
               })}

                <Text></Text>
                <Text></Text>

           </ScrollView>
                <Link
                    href={{ pathname: './service-add', params: { id: vehicle.id}}}
                    style={ AppStyles.button }
                    >
                    <Text>Add Service</Text>
                </Link>
        </View>
    );
}

const styles = StyleSheet.create({

  });