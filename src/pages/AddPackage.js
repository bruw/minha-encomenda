import React, {useState} from 'react';
import {  StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import Header from '../components/Header';
import RequestAPI from '../components/RequestAPI';

export default function AddPackage(props) {
    const [trackingCode, setTrackingCode] = useState();
    const [packageSurname, setPackageSurname] = useState();

    return (
        <SafeAreaView style={styles.container}> 
            <Header />
            <Text style={styles.title}>Adicionar Novo Pacote</Text>
            
            <View style={styles.inputsPackage}>
                <TextInput style={styles.inputPackName}
                    label="Apelidar pacote"
                    mode="outlined"
                    right={<TextInput.Icon name="package-variant-closed" />}
                    maxLength= {22}
                    onChangeText={text => setPackageSurname(text)}
                />

                <TextInput style={styles.inputPackCode}
                    label="Código de rastreio"
                    mode="outlined"
                    right={<TextInput.Icon name="barcode-scan" />}
                    maxLength= {13}
                    onChangeText={text => setTrackingCode(text)}
                />
            </View>
            
            <RequestAPI surname={packageSurname} code={trackingCode}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  title:{
    marginTop: 30,
    color: '#3E00AA',
    fontSize: 24,
    fontWeight: 'bold',
  },

  inputsPackage: {
    marginTop: 30,
  },

  inputPackName: {
    width: 335, 
  },

  inputPackCode: {
    width: 335, 
    marginTop: 30, 
  },

});