import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { theme } from '../../themes';

import ActionMenu from '../ActionMenu';

export default function Header(props) {
    
    return (
        <View style={styles.container}>
            <Image 
              style={styles.imageLogo}
              source={require('../../../assets/images/logo.png')}
            />
            
            <ActionMenu />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%", 
    },
    
    imageLogo: {
        width: 75,
        height: 80,
    },
});
