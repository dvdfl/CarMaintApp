import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    //padding: 20,
    /*backgroundColor: "pink",*/
  },
  subContainer: {
      padding: 20,
  },
  formWrapper: {
      paddingVertical: 30,
      //paddingVertical: 30,
      // marginBottom: 20,
  },
  carItem: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#260F01',
    //backgroundColor: '#F2EAC2',
    borderRadius: 8,
    marginBottom: 20,
  },
  carItemTitle: {
   fontWeight: 'bold',
   fontSize: 20,
  },
  screenTitle: {
      marginBottom: 5,
      fontWeight: 'bold',
      fontSize: 24,
      },
 label: {
     fontWeight: 'bold'
     },
 detailSection: {
      marginTop: 10,
      paddingBottom: 5,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderColor: 'gray',
      },
 button: {
     color: "#F2EAC2",
     fontSize: 20,
     //backgroundColor: "#6c757d",
     backgroundColor: "#4480A6",
     //borderColor: "#6c757d",
     //borderRadius: 8,
     //border: "1px solid transparent",
     border: 1,
     //padding: 10,
     paddingVertical: 20,
     textAlign: "center",
     marginTop: 30,
     },
 buttonText: {
     color: "#FFF",
     fontSize: 18,
     textAlign: 'center',
   },
 flexRow: {
         flexDirection: 'row'
       },
 iconWrap: {
       paddingHorizontal: 7,
       alignItems: "center",
       justifyContent: "center",
     },
 icon30: {
      height: 30,
      width: 30,
    },
  markWrap: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'pink'
  },
  mark: {
    width: null,
    height: null,
    minHeight: 80,
    maxHeight: 150,
    flex: 1,
  },
});