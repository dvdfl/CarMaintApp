import React from 'react';
import { Link } from 'expo-router';
import { Image, StyleSheet} from 'react-native';
import { RefreshControl, ScrollView, Text, View, Button } from "react-native";
import database from '../api/db';
import { BasicListItem } from '@/components/ListItem';

/*const data = {
                 "fetchPrevious":
                      [
                             { "id": "1", "name": "Service 1", "date": "12/01/2024"},
                             { "id": "2", "name": "Service 2", "date": "12/05/2024"},
                             { "id": "3", "name": "Service 3", "date": "12/21/2024"}
                         ],
                 "fetchUpcoming":
                   [
                          { "id": "4", "name": "Service 4", "date": "12/01/2024"},
                          { "id": "5", "name": "Service 5", "date": "12/05/2024"},
                          { "id": "6", "name": "Service 6", "date": "12/21/2024"}
                      ]

             }*/

export default function Index() {
     const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
    console.log("== Index ==");
    console.log(database.fetchVehicles());
    console.log(database.fetchPrevious());
  return (
    <View
      style={styles.mainView}
    >
      <ScrollView style={styles.scrollView}
        refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
        >
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
                           mainText={service.description}
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
                           mainText={service.description}
                          ></BasicListItem>;
               })}
        </View>
        <Link href="vehicles" style={ styles.button }>Vehicles </Link>
        <Text></Text>

        {/* <Button href="vehicles"
            title="Add Service"
          /> */}
      </ScrollView>
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
      padding: 20,
      /*backgroundColor: "pink",*/
      },
  sectionHeader: {
      backgroundColor: "#5390d9",
      padding: 10,
      marginTop: 20,
      },
  sectionHeaderText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      },
  serviceItem: {
      marginBottom: 25,
     },
  serviceItemText: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'black',
      color: 'black',
      fontSize: 20,
     },
  button: {
      color: "#fff",
      fontSize: 20,
      //backgroundColor: "#6c757d",
      backgroundColor: "#007bff",
      //borderColor: "#6c757d",
      borderRadius: 8,
      //border: "1px solid transparent",
      border: 1,
      padding: 10,
      textAlign: "center"
      }
});