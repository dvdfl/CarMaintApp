import { Link } from 'expo-router';
import { Button, Pressable, StyleSheet, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { TouchListItem } from '@/components/ListItem';
import { ConfirmModal } from '@/components/Modal';
import database from '../api/db';
import AppStyles from './AppStyles'

export default function Vehicles() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage,setModalMessage] = useState("-- Empty --");
    const [modalData, setModalData] = useState(null);

    const showVehicleDetail = (id)=> {
        console.log("- Show Vehicle Detail for ID: " + id.toString());
        navigation.navigate('vehicle-detail', { id: id });
    }
    const showDeleteConfirmation= (car) => {
        console.log("- Show delete confirmation");
        setModalData(car.id);
        setModalMessage("Please confirm you want to delete vehicle information for \n\n " + car.carMake + " " + car.carModel + " (" + car.carYear + ")")
        setModalVisible(true);
    }
    const cancelDelete= (id) => {
        console.log("Delete cancelled");
        setModalVisible(false);
        setModalData(null);
    }
    const editVehicle= (id) => {
        console.log("-Edit Vehicle ID: " + modalData);
        navigation.navigate("vehicle-edit", { id: id });
    }
    const deleteVehicle= (id) => {
        console.log("delete confirmed for Vehicle ID: " + modalData);
        database.removeVehicle(modalData);
        setModalVisible(false);
    }

    return (
        <View style={AppStyles.container}>
           <ScrollView style={AppStyles.scrollView}>
                <View style={AppStyles.subContainer}>
                    {database.fetchVehicles().map((car) => {
                         return  (
                             <TouchListItem
                                    key={car.id}
                                    itemId={car.id}
                                    itemStyle={AppStyles.carItem}
                                    titleStyle={ AppStyles.carItemTitle }
                                    touchHandler={showVehicleDetail}
                                    titleText = {car.carMake + ' ' + car.carModel + ' (' + car.carYear +')'}
                                    subText = {car.carMileage + ' mi'}
                                    deleteHandler={()=>showDeleteConfirmation(car)}
                                    editHandler={()=>editVehicle(car.id)}
                                >
                             </TouchListItem>
                         );
                       })}
                </View>
           </ScrollView>
           {/*<Link href="vehicle-add" style={ AppStyles.button }> Add Vehicle </Link>*/}
           {/*<Button
                     style={[AppStyles.button, styles.buttonOpen]}
                     onPress={showDeleteConfirmation}
                     title="Show Modal"
                   /> */}
           <ConfirmModal
                visible ={modalVisible}
                okHandler={deleteVehicle}
                cancelHandler={cancelDelete}
                textMessage={modalMessage}

           />
        </View>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});