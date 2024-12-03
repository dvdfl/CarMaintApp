import { Stack } from "expo-router";
import { Image, StyleSheet } from 'react-native';

export default function RootLayout() {
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
                      title: 'Welcome'
                      }}/>

      <Stack.Screen name="vehicles"
             options={{
                      title: 'Your Vehicles'
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
                      title: 'Service Detail'
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