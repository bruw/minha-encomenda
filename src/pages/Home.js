import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';

import Header from '../components/Header';
import CardPackage from '../components/CardPackage'
import { theme } from '../themes';

import Order from '../services/sqlite/Order';

export default function Home(props) {
    const [packageData, setPackageData] = useState([]);
    const [reload, setReload] = useState(false);

    const Item = ({ item }) => (
      <CardPackage 
          id={item.id} 
          surname={item.surname} 
          trackingCode={item.tracking_code}
          lastSituation={item.last_situation}
          city={item.city}
          date={item.date}
          hour={item.hour}
          stateReload={reload}
          recharge={(newState) => setReload(newState)}
      />
    )

    useEffect(() => {
        Order.all()
          .then(
            (response) =>setPackageData(response),
          )
  
          .catch((error) => 
            console.log(error)
          )
          
    },[reload])

    if(packageData.length !== 0){
        return (
          <SafeAreaView style={styles.container}> 
              <Header />
            
              <FlatList
                data={packageData}
                keyExtractor={({id}, index) => id.toString()}
                renderItem={ ({item}) => <Item item={item} />}
                ListHeaderComponent={ <Text style={styles.titlePage} >Pacotes</Text>}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />

          </SafeAreaView>
        );
    }else{
      return(
        <SafeAreaView>
           <Header />
           <View style={styles.viewEmptyList}>
              <Text style={styles.textEmptyList}>Você ainda não possui pacotes cadastrados</Text> 
           </View>
        </SafeAreaView>
      );
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  titlePage : {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
    textAlign: 'center',
  },

  viewEmptyList : {
    height: 536,
    justifyContent: 'center',
  },

  textEmptyList : {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.primary,
  },
    
});