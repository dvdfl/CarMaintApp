import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    /*backgroundColor: "pink",*/
  },
  carItem: {
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    backgroundColor: '#d5d5d5',
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
     },
});