import { Link, Stack } from "expo-router";
import { Image, StyleSheet, View } from 'react-native';

export default function RootLayout(props) {
  const addCarIcon = require("../assets/images/transport.png");
  const carIcon = require("../assets/images/car.png");
  const accountIcon = require("../assets/images/account.png");
  return (
    <Stack screenOptions={{
                   headerStyle: {
                     backgroundColor: '#F2CEA2',
                   },
                   headerTintColor: '#260F01',
                   headerTitleStyle: {
                     fontWeight: 'bold',
                   },
                 }}>
      <Stack.Screen name="index"
             options={{
                      title: 'Welcome',
                      headerRight: ()=> <View style={{ flexDirection: 'row' }}><Link
                                      style={{paddingBottom:10, paddingRight: 25, marginTop: -5}}
                                      href="vehicles">
                                      <Image source={carIcon}
                                          style={{ height: 35, width: 35 }} resizeMode="cover" />
                                   </Link>
                                   <Link
                                         style={{paddingBottom:10, paddingRight: 5, marginTop: -5}}
                                         href="account">
                                         <Image source={accountIcon}
                                             style={{ height: 35, width: 35 }} resizeMode="cover" />
                                      </Link>
                                   </View>,
                      }}/>
      <Stack.Screen name="account"
             options={{
                      title: 'Account'
                      }}/>
      <Stack.Screen name="vehicles"
             options={{
                      title: 'Your Vehicles',
                      //headerTitle: ()=> <Text>Your Vehicles</Text>,
                      headerRight: ()=> <Link
                                            style={{paddingBottom:10, paddingRight: 5, marginTop: -5}}
                                            href="vehicle-add">
                                            <Image source={addCarIcon}
                                                style={{ height: 35, width: 35 }} resizeMode="cover" />
                                         </Link>,
                      }}/>
      <Stack.Screen name="vehicle-edit"
             options={{
                      title: 'Edit Vehicle'
                      }}/>
      <Stack.Screen name="vehicle-add"
             options={{
                      title: 'Add a New Vehicle'
                      }}/>
      <Stack.Screen name="vehicle-detail"
             options={{
                      title: 'Vehicle Detail'
                      }}/>

      <Stack.Screen name="service-add"
             options={{
                      title: 'Add Service'
                      }}/>
      <Stack.Screen name="service-detail"
             options={{
                      title: 'Service Detail',
                      }}/>
      <Stack.Screen name="service-edit"
             options={{
                      title: 'Edit Service'
                      }}/>
    </Stack>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
      height: 178,
      },
  mainView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "pink",
      }
});