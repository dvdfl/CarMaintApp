import { Link } from 'expo-router';
import { useNavigation, useRoute } from "@react-navigation/native"
import { Button, Image, StyleSheet, ScrollView, Text, TouchableHighlight, View } from "react-native";
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
    const editIcon = require("../assets/images/edit-icon.png");

    return (
        <View style={AppStyles.container}>
          <ScrollView style={[AppStyles.scrollView, AppStyles.subContainer]}>
               <View>
                    <View style={AppStyles.flexRow}>
                        <Text
                           style={[AppStyles.screenTitle, { flex: 5}]} >
                           {service.description}
                        </Text>
                       <Link
                            href={{ pathname: './service-edit', params: { id: service.id}}}
                          >
                            <View style={[AppStyles.iconWrap, { flex: 1, marginTop: 5}]}>
                                    <Image source={editIcon} style={AppStyles.icon30} resizeMode="contain" />
                            </View>
                       </Link>
                    </View>
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

          </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({

  });