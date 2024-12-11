import { Link } from 'expo-router';
import { Button, Image, StyleSheet, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import { TouchListItem } from '@/components/ListItem';
import { useState } from 'react';
import database from '../api/db';
import util from '../api/util';
import AppStyles from './AppStyles'
import { ConfirmModal } from '@/components/Modal';

export default function viewVehicle() {
    const route = useRoute();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage,setModalMessage] = useState("-- Empty --");
    const [modalData, setModalData] = useState(null);
    const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
    const vehicle = database.fetchVehicle(route.params.id);
    const editIcon = require("../assets/images/edit-icon.png");
    const addServiceIcon = require("../assets/images/wrench-add.png");
    const removeIcon = require("../assets/images/bin.png");

    console.log("=== vehicle detail ===");
    console.log("Vehicle ID: " + route.params?.id);
    console.log(vehicle);
    const showServiceDetail = (id)=> {
        console.log("detail to add service: " + id);
        navigation.navigate('service-detail', { id: id });
    }
    const showDeleteConfirmation= (service) => {
        console.log("- Show delete confirmation");
        setModalData(service.id);
        setModalMessage("Please confirm you want to delete service entry \n\n " + service.description + " " + " (" + service.serviceDate + ")")
        setModalVisible(true);
    }
    const editService= (id) => {
        console.log("-Edit Service ID: " + modalData);
        navigation.navigate("service-edit", { id: id });
    }
    const cancelDelete= (id) => {
        console.log("Delete cancelled");
        setModalVisible(false);
        setModalData(null);
    }
    const deleteService= (id) => {
        console.log("delete confirmed for Service ID: " + modalData);
        database.removeService(modalData);
        setModalVisible(false);
    }
    const showVehicleDelete = () => {
        setVehicleModalVisible(true);
    }
    const deleteVehicle= (id) => {
        console.log("delete confirmed for Vehicle ID: " + modalData);
        database.removeVehicle(id);
        navigation.navigate("vehicles", { id: id });
        //setVehicleModalVisible(false);
    }
    const cancelVehicleDelete= (id) => {
        console.log("Vehicle Delete cancelled");
        setVehicleModalVisible(false);

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
                        {/*<Link
                            href={{ pathname: './vehicle-edit', params: { id: vehicle.id}}} >
                            <View style={[AppStyles.iconWrap, { flex: 1, marginTop: 5}]}>
                                    <Image source={editIcon} style={AppStyles.icon30} resizeMode="contain" />
                            </View>
                        </Link>*/}
                    </View>
                    <Text>
                        Mileage: {vehicle.carMileage}
                    </Text>
                </View>
                <View style={[AppStyles.flexRow, { flex: 1, justifyContent : 'space-even'}]}>
                    <Link
                        href={{ pathname: './service-add', params: { id: vehicle.id}}}
                        style={ [AppStyles.buttonAlt, { flex : 1, margin: 5 }] }
                        >
                        <View style={[AppStyles.alignCenter, { flex: 1, flexDirection: 'column' }]} >
                            <Text style={{ flex: 1}}>Add Service</Text>
                            <View style={{alignItems: 'center', marginTop: 2}}>
                            <Image source={addServiceIcon} style={[AppStyles.icon30]} resizeMode="contain" />
                            </View>
                         </View>
                    </Link>
                    <Link
                        href={{ pathname: './vehicle-edit', params: { id: vehicle.id}}}
                        style={ [AppStyles.buttonAlt, {flex : 1, margin: 5}] }
                        >
                        <View style={[AppStyles.alignCenter, { flex: 1, flexDirection: 'column' }]} >
                            <Text style={{ flex: 1}}>Edit Vehicle</Text>
                            <View style={{alignItems: 'center', marginTop: 2}}>
                            <Image source={editIcon} style={[AppStyles.icon30]} resizeMode="contain" />
                            </View>
                         </View>
                    </Link>
                    <TouchableOpacity activeOpacity={.5} onPress={showVehicleDelete}
                        style={ [AppStyles.buttonAlt, {flex : 1, margin: 5}] }>

                    {/*<Link
                        href={{ pathname: './service-add', params: { id: vehicle.id}}}
                        style={ [AppStyles.buttonAlt, {flex : 1, margin: 5}] }
                        >*/}
                        <View style={[AppStyles.alignCenter, { flex: 1, flexDirection: 'column' }]} >
                            <Text style={[ AppStyles.alignCenter, { flex: 1}]}>Delete Vehicle</Text>
                            <View style={{alignItems: 'center', marginTop: 2}}>
                            <Image source={removeIcon} style={[AppStyles.icon30]} resizeMode="contain" />
                            </View>
                         </View>
                    {/*</Link>*/}
                    </TouchableOpacity>
                </View>
                <View style={AppStyles.section}>
                    <Text style={AppStyles.sectionText}>Upcoming Services</Text>
               </View>
                   {vehicle.services.filter(util.futureServiceDateFilter).slice(0, 3).map((service) => {
                     return  (
                         <TouchListItem key={service.id}
                                 itemId={service.id}
                                 itemStyle={AppStyles.carItem}
                                 titleStyle={ AppStyles.carItemTitle }
                                 touchHandler= {showServiceDetail}
                                 titleText = {service.description}
                                 subText = {' Service date: ' + service.serviceDate }
                                 deleteHandler={()=>showDeleteConfirmation(service)}
                                 editHandler={()=>editService(service.id)}
                             >
                          </TouchListItem>
                     );
                   })}
               <View style={AppStyles.section}>
                <Text style={AppStyles.sectionText}>Previous Services</Text>
               </View>
               {vehicle.services.filter(util.previousServiceDateFilter).slice(0, 3).map((service) => {
                 return  (
                     <TouchListItem key={service.id}
                             itemId={service.id}
                             itemStyle={AppStyles.carItem}
                             titleStyle={ AppStyles.carItemTitle }
                             touchHandler= {showServiceDetail}
                             titleText = {service.description}
                             subText = {' Service date: ' + service.serviceDate }
                             deleteHandler={()=>showDeleteConfirmation(service)}
                             editHandler={()=>editService(service.id)}
                         >
                      </TouchListItem>
                 );
               })}
                <Link
                   href={{ pathname: './service-add', params: { id: vehicle.id}}}
                   style={ AppStyles.buttonAlt }
                   >View All </Link>

                <Text></Text>
                <Text></Text>

           </ScrollView>

           <ConfirmModal
                visible={modalVisible}
                okHandler={deleteService}
                cancelHandler={cancelDelete}
                textMessage={modalMessage}
            />
            <ConfirmModal
                visible={vehicleModalVisible}
                okHandler={() => deleteVehicle(vehicle.id)}
                cancelHandler={cancelVehicleDelete}
                textMessage={"Please confirm you want to delete vehicle information for \n\n " + vehicle.carMake + " " + vehicle.carModel + " (" + vehicle.carYear + ")"}
            />
        </View>
    );
}

const styles = StyleSheet.create({

  });