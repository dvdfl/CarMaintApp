import { Link } from 'expo-router';
import { Image, View, Text, TouchableHighlight } from "react-native";

export function BasicListItem ({key, pathname, params, style, mainText} : attrs ) {
    const hrefValues = { pathname: pathname, params: params };
    console.log("Basic List Item");
    console.log(hrefValues);
    return <View key={key}>
            <Link
                href={hrefValues}
                style={ style }>{mainText}</Link>
        </View>

}

export function TouchListItem ({itemKey, itemStyle, titleStyle, touchHandler, titleText, subText} : attrs ) {
    console.log("Touch List Item");
    console.log(itemKey);
    return <TouchableHighlight
               key={itemKey}
               onPress={() => touchHandler(itemKey)}
               style={itemStyle}>
               <View>
                   <Text style={ titleStyle }>
                       {titleText}
                   </Text>
                   <Text>{subText}</Text>
               </View>
            </TouchableHighlight>;

  }