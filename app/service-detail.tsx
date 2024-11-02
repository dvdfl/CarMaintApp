import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, ScrollView, Text, TouchableHighlight, View, Button } from "react-native";
import AppStyles from './AppStyles'
import database from '../api/db';



export default function viewService() {
    const route = useRoute();
    console.log("=== vehicle detail ===");
    console.log(route.params?.id);
    const service = database.fetchService(route.params?.id);
    console.log(service);
    const today = new Date();
    const [month, day, year] = service.serviceDate.split('/').map(Number);
    const serviceDate = new Date(year, month - 1, day);

    return (
        <View style={AppStyles.container}>
          <ScrollView style={AppStyles.scrollView}>
               <View>
                   <Text
                       style={AppStyles.screenTitle} >
                       {service.description}
                   </Text>

                   {(serviceDate < today)?
                       <Text style={AppStyles.detailSection}>Performed on: {service.serviceDate} **</Text>
                   :
                        <Text style={AppStyles.detailSection}>Scheduled for: {service.serviceDate} **</Text>
                   }

               </View>
                 <View style={AppStyles.detailSection}>
                <Text style={AppStyles.label}>
                   Cost:
                </Text>
                <Text>
                    {service.cost.toLocaleString('en-us', {minimumFractionDigits: 2})}
                 </Text>
              </View>
               {
                   (service.mileage) ?
                   <View style={AppStyles.detailSection}>
                     <Text style={AppStyles.label}>
                        Mileage:
                     </Text>
                     <Text>
                         {service.mileage}
                      </Text>
                   </View>
                   : <View />
               }


               <Text></Text>

          </ScrollView>

        </View>
    );
}