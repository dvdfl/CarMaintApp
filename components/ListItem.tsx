import { Link } from 'expo-router';
import { Button, Image, View, Text, TouchableHighlight,TouchableOpacity } from "react-native";
import AppStyles from '../app/AppStyles'


export function BasicListItem ({pathname, params, style, mainText} : attrs ) {
    const hrefValues = { pathname: pathname, params: params };
    //console.log("--Basic List Item--");
    //console.log("--key: " + listItemKey);
    //console.log(hrefValues);
    return <View
            //key={listItemKey}
            >
            <Link
                href={hrefValues}
                style={ style }>{mainText}</Link>
        </View>
}

export function TouchListItem ({itemId, itemStyle, titleStyle, touchHandler, titleText, subText, deleteHandler, editHandler} : attrs ) {
    const deleteIcon = require("../assets/images/bin.png");
    const editIcon = require("../assets/images/edit-icon.png");
    //console.log("--Touch List Item--");
    //console.log("-" + itemId);
    return <TouchableHighlight
               //key={itemKey}
               onPress={() => touchHandler(itemId)}
               style={itemStyle}>
               <View>
                 <View style={AppStyles.flexRow}>
                   <Text style={[ titleStyle, { flex: 5} ]}>
                       {titleText}
                   </Text>
                   {(editHandler != null) && <TouchableOpacity activeOpacity={.5} onPress={editHandler}>
                          <View style={[AppStyles.iconWrap, { flex: 1, marginTop: 5}]}>
                                 <Image source={editIcon} style={AppStyles.icon30} resizeMode="contain" />
                         </View>
                     </TouchableOpacity>}
                   <TouchableOpacity activeOpacity={.5} onPress={deleteHandler}>
                          <View style={[AppStyles.iconWrap, { flex: 1, marginTop: 5}]}>
                                 <Image source={deleteIcon} style={AppStyles.icon30} resizeMode="contain" />
                         </View>
                     </TouchableOpacity>
                 </View>
                 <Text>{subText}</Text>
               </View>
            </TouchableHighlight>;

  }