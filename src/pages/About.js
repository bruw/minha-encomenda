import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, Linking } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from '../components/Header';
import { theme } from '../themes';

const githubBruw = "https://github.com/bruw"; 

export default function About(props) {
  return (
    <SafeAreaView style={styles.container}>
        <Header />
          <View style={styles.about}>
              <Image source={require('../../assets/images/logo.png')} style={styles.imgLogo}></Image>
              <Text style={styles.textAbout}>Versão 1.0</Text>
              <Text style={styles.textAbout}>Desenvolvido por</Text>
              <Text style={styles.textAbout} onPress={() => Linking.openURL(githubBruw)}>
                <MaterialCommunityIcons name='github' style={styles.iconGithub}/>Bruno Wogt
              </Text>
              <Image source={require('../../assets/images/galo-cego.gif')} style={styles.imgGif}></Image>
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  about: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 400,
    marginTop: 30,
  },

  textAbout:{
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'monospace',
  },

  imgLogo: {
    width: 300,
    height: 90,
  },

  iconGithub: {
    color: theme.colors.primary,
      fontSize: 20,
  },

  imgGif: {
    width: 280,
    height: 170,
    marginTop: 20,
  }
});