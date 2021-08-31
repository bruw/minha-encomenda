import React, {useEffect} from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Alert } from 'react-native';
import { Button, Modal, Portal} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import api from "../../services/API/api";
import Order from "../../services/sqlite/Order";
import { theme } from '../../themes';

import axios from 'axios';
  

export default function RequestAPI(props) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 40};
    const navigation = useNavigation();

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let packageOrder, eventSituation, eventDate,
        eventHour, eventCity;

    useEffect(() => {
        return () => {
            source.cancel();
        }
    },[])

    const explodeResponseApi = () => {
        let eventOccurence;

        eventSituation = packageOrder.objetos[0].eventos[0].descricao,
        eventCity = packageOrder.objetos[0].eventos[0].unidade.endereco.cidade;
        eventOccurence = packageOrder.objetos[0].eventos[0].dtHrCriado.split("T"),
        eventDate = eventOccurence[0];
        eventHour = eventOccurence[1];
    }

    const savePackageOrder = () => {
        Order.create({
            surname: props.surname, 
            tracking_code: props.code,
            last_situation: eventSituation,
            date: eventDate,
            hour: eventHour, 
            city: eventCity
        })
        .then(
            id => console.log("Pacote criado com o id: "+id),
            source.cancel("clear"),
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        )

        .catch(
            (error) => {console.log(error)}
        )
    }

    const getPackage = () => {
        let continueRunning = true;

        if((props.code === '') || (props.code === undefined)){
            Alert.alert("Ops...", "Campo de código é obrigatorio");
            
        }else{
            showModal();

            api.get(props.code, {cancelToken: source.token })
                .then((response) => {
                    packageOrder = response.data;
                })
                
                .catch((error) => {
                    console.log(error),
                    continueRunning = false,
                    Alert.alert("Ops...", "Serviço indisponível no momento, tente novamente mais tarde")
                })
                
                .finally(() => {
                    let message = packageOrder.objetos[0].mensagem;

                    if(continueRunning && message === undefined){
                        explodeResponseApi();
                        savePackageOrder();
                    }else{
                        Alert.alert("Código inválido", "Favor, verifique o código e tente novamente...");
                    }
                
                    hideModal()
                })

            setTimeout(()=>{
                source.cancel("Requisição Cancelada"),
                hideModal()
            }, 1500)
        }
    }
        
    return (
        <View style={styles.container}> 
            <Portal> 
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                    <Text style={styles.titleModal}>Carregando dados do pacote</Text>
                    <ActivityIndicator size="large" color="#3E00AA" />
                </Modal>
            </Portal> 

            <Button style={styles.btnSearch}
                icon="magnify" 
                mode="contained" 
                onPress={() => getPackage()}>
                Pesquisar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnSearch: {
    width: 200,
    marginTop: 40,
  },   

  titleModal: {
    color: theme.colors.primary,
    paddingBottom: 18,
    fontSize: 16,
    textAlign: 'center',
  },
});