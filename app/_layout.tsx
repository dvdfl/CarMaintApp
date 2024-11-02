import { Stack } from "expo-router";
import { Image, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <Stack screenOptions={{
                   headerStyle: {
                     backgroundColor: '#0077b6',
                   },
                   headerTintColor: '#fff',
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
      <Stack.Screen name="vehicle-add"
             options={{
                      title: 'Add a New Vehicle'
                      }}/>
      <Stack.Screen name="vehicle-detail"
             options={{
                      title: 'Vehicle detail'
                      }}/>
      <Stack.Screen name="service-add"
             options={{
                      title: 'Vehicle detail'
                      }}/>
      <Stack.Screen name="service-detail"
             options={{
                      title: 'Service detail'
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