import React from 'react';
import { Link } from 'expo-router';
import { Image, StyleSheet} from 'react-native';
import { RefreshControl, ScrollView, Text, View, Button } from "react-native";
import database from '../api/db';
import AppStyles from './AppStyles'
import { BasicListItem } from '@/components/ListItem';

export default function Index() {
     const [refreshing, setRefreshing] = React.useState(true);

     const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    database.loadData().then(()=>{
        console.log("data loaded");
        console.log(database.fetchVehicles());
        setRefreshing(false);
        });
    console.log("== Index ==");

  return (
    <View
      style={AppStyles.container} >
      <ScrollView style={[AppStyles.scrollView, AppStyles.subContainer]}
        refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Upcoming Services</Text>
        </View>
        <View style={styles.serviceItem}>
               {database.fetchUpcoming().map((service) => {
                return <BasicListItem
                           key={service.id}
                           pathname={'./service-detail'}
                           params={ {id: service.id} }
                           style={styles.serviceItemText}
                           mainText={ service.serviceDate + ' - ' + service.description}
                          ></BasicListItem>;
              })}
        </View>

        <View style={styles.sectionHeader}>
         <Text style={styles.sectionHeaderText}>Recent Services</Text>
        </View>
        <View style={styles.serviceItem}>
               {database.fetchPrevious().map((service) => {
                 return <BasicListItem
                           key={service.id}
                           pathname={'./service-detail'}
                           params={ {id: service.id} }
                           style={styles.serviceItemText}
                           mainText={service.serviceDate + ' - ' + service.description}
                          ></BasicListItem>;
               })}
        </View>

      </ScrollView>
        {/*<Link href="vehicles" style={ AppStyles.button }>Vehicles </Link>
        <Text></Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
      height: 178,
      },
  mainView: {
      flex: 1,
      /*flexDirection: 'row',*/
      justifyContent: "center",
      /*alignItems: "center",*/
      /*backgroundColor: "#a1b2a4",*/
      },
  textDemo: {
      fontSize: 25,
      marginTop: 20,
      },
  scrollView: {
      flex: 1,

      /*backgroundColor: "pink",*/
      },
  sectionHeader: {
      backgroundColor: "#8C837B",
      padding: 10,
      marginTop: 20,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      },
  sectionHeaderText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      },
  serviceItem: {
      marginBottom: 25,
      backgroundColor: '#e1e2e3',
     },
  serviceItemText: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'black',
      color: 'black',
      fontSize: 20,
     }
});