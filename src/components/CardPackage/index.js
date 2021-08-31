import  React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {Card, Divider, IconButton, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../themes';

import api from "../../services/API/api";
import InformationField from '../InformationField';
import Order from "../../services/sqlite/Order";

export default function CardPackage(props) {
    const navigation = useNavigation();
    
    let storedPackage, situationPackage, currentSituation, currentCity, eventDate, eventHour;

    const showConfirm = (id, reload) => {
      Alert.alert("Exclusão de pacote", "Deseja realmente excluir este pacote?", [
        {
          text:"Sim",
          onPress: () => 
             Order.remove(id)
                .then( 
                  props.recharge(!reload),
                  updated => console.log("Pacote deletado: "+ updated) 
                )
                .catch( err => console.log(err) )
          ,
          style: "destructive",
        },
        {
          text:"Não",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        }
      ]);
    }

    const explodeResponseApi = () => {
      let eventOccurence;

      currentSituation= situationPackage.objetos[0].eventos[0].descricao;
      currentCity = situationPackage.objetos[0].eventos[0].unidade.endereco.cidade;
      eventOccurence = situationPackage.objetos[0].eventos[0].dtHrCriado.split("T");
      eventDate = eventOccurence[0];
      eventHour = eventOccurence[1];
      
    }

    const startUpdate = (id) => {
        let continueRunning = true;

        Order.find(id)
          .then((response) => storedPackage = response)
          
          .catch(() => {
              Alert.alert("Ops...", "Objeto inexistente na base de dados"),
              continueRunning = false
            }
          )

          .finally(() => {
              if(continueRunning){
                checkUpdate(id, storedPackage.tracking_code, storedPackage.last_situation)
              }
          })
    }

    const checkUpdate = (id, trackingCode, lastSituation) => {
        let continueRunning = true;
        
        api.get(trackingCode)
          .then((response) => situationPackage = response.data)

          .catch(() => {
              Alert.alert("Ops...", "Serviço indisponível no momento"),
              continueRunning = false
            }
          )
          
          .finally(() => {
              if(continueRunning){
                explodeResponseApi();
               
                if((currentSituation !== storedPackage.last_situation) || (currentCity != storedPackage.city)){
                  let packageUpdate = {
                      last_situation : currentSituation,
                      date : eventDate,
                      hour : eventHour,
                      city : currentCity
                  }
                 
                  Order.update(id, packageUpdate)
                    .catch(() => 
                        Alert.alert("Ops...", "Serviço indisponível no momento"),
                        continueRunning = false
                    )

                    .finally(() => {
                          if(continueRunning){
                              Alert.alert("", "Novas informações carregadas"),
                  
                              navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                              })
                          }
                      }
                    )
                }else{
                  Alert.alert("", "Objeto não possui atualiações no momento")
                }
              }
            }
          )


        // TRECHO DE CÓDIGO PARA TESTE DE UPDATE DE PACOTE !!!!!!!!!!!!
        // let packageUpdate = {
        //     last_situation : "Chegou ao triângulo das bermudas",
        //     date : "2021-08-29",
        //     hour : "12:30:45",
        //     city : "Curitiba"
        // }
                   
        // Order.update(id, packageUpdate)
        //     .finally(() => 
        //         Alert.alert("", "Novas informações carregadas"),
        //           navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'Home' }],
        //           })
        //     )

    }


    return (
        <View style={styles.container}> 
            <Card style={styles.card}>

                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{props.surname}</Text>
                    <IconButton
                      icon="reload"
                      color={theme.colors.secondary}
                      size={23}
                      onPress={() => 
                          startUpdate(props.id)
                      }
                    />
                </View>
                
                <InformationField 
                  trackingCode={props.trackingCode} 
                  lastSituation={props.lastSituation}
                  city={props.city}
                  date={props.date}
                  hour={props.hour}
                />
            
                <Divider style={styles.cardDivider}/>

                <Card.Actions style={styles.cardAction}>
                    <Button 
                      onPress={
                        () => {
                          showConfirm(props.id, props.stateReload)
                        }
                      }

                      color={'#FF0000'} 
                      icon="delete-forever-outline">Deletar
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card : {
    width: 330,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 35, 
    marginBottom: 30,
  },

  cardTitle : {
    textAlign: "center",
    color: theme.colors.secondary,
    fontSize: 18,
    marginLeft: 12,
  },

  cardDivider : {
    backgroundColor: theme.colors.primary,
  },

  cardHeader : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

});