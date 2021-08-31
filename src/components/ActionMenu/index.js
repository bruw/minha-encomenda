import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { IconButton } from 'react-native-paper';
import { theme } from '../../themes';

export default function ActionMenu(props){
    const { showActionSheetWithOptions } = useActionSheet();
    const navigation = useNavigation();
    const route = useRoute();

    const optionsScreenHome = ['Adicionar objeto', 'Sobre', 'Cancelar'];
    const optionsScreenAdd = ['Meus objetos', 'Sobre', 'Cancelar'];
    const optionsScreenAbout = ['Meus objetos', 'Adicionar objeto', 'Cancelar'];
   
    let options, cancelButtonIndex;
    let firstDestinationRoute = "AddPackage";
    let secondDestinationRoute = "About";
    const AS_CANCEL = 2;

    if( route.name === 'Home'){
      options = optionsScreenHome;
      cancelButtonIndex = AS_CANCEL;
  
    }else{
      if( route.name === 'AddPackage' ){
        options = optionsScreenAdd;  
        cancelButtonIndex = AS_CANCEL;
        firstDestinationRoute = "Home";

      }else{
        options = optionsScreenAbout;  
        cancelButtonIndex = AS_CANCEL;
        firstDestinationRoute = "Home";
        secondDestinationRoute = "AddPackage";
      }
     
    }
    
    return <IconButton
      icon="menu"
      color={theme.colors.secondary}
      size={33}
      onPress={() => {showActionSheetWithOptions(
        { 
          options,
          cancelButtonIndex,
          showSeparators: 'true',
        },

        buttonIndex => {
          if(buttonIndex == 0)
            navigation.navigate(firstDestinationRoute);
          else{
            if(buttonIndex == 1)
              navigation.navigate(secondDestinationRoute);
          }
          
        },
      )}}
    />
}
