import { Button, Pressable, Modal, StyleSheet, ScrollView, Text, TouchableHighlight, View } from "react-native";

export function ConfirmModal ({visible, okHandler, cancelHandler, textMessage, titleText, subText}: ConfirmModalAttrs){

  // console.log("== Modal ==");
  //console.log(visible);

  return  <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onRequestClose={() => {
                console.log('Modal => Modal has been closed.');
                //setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{textMessage}</Text>
                  <View style={styles.buttonsSection}>
                     <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={okHandler}>
                        <Text style={styles.textStyle}>Yes, delete it.</Text>
                     </Pressable>
                     <Pressable
                         style={[styles.button, styles.buttonClose]}
                         onPress={cancelHandler}>
                         <Text style={styles.textStyle}>No, don't delete it.</Text>
                     </Pressable>
                  </View>
                </View>
              </View>
            </Modal>;
}
export function CustomModal ({children, visible}: CustomModalAttrs){
    console.log("== Custom Modal==");
    return <Modal
             animationType="slide"
             transparent={true}
             visible={visible}
             onRequestClose={() => {
               console.log('Modal => Custom Modal has been closed.');
               //setModalVisible(!modalVisible);
             }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {children}
                </View>
              </View>
            </Modal>;
    }

const styles = StyleSheet.create({
    buttonsSection:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        //backgroundColor: 'skyblue',
    },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.7)',

  },
  modalView: {
    margin: 20,
    backgroundColor: '#F2EAC2',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4480A6',
    padding: 30,
    //alignItems: 'center',
    shadowColor: '#4480A6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: '45%',
  },
  buttonOpen: {
    backgroundColor: '#8C837B',
  },
  buttonClose: {
    backgroundColor: '#4480A6',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});