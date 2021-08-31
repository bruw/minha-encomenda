import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List, Paragraph} from 'react-native-paper';
import { theme } from '../../themes';

export default function InformationField(props) {
    return (
        <View> 
           <View style={styles.cardItem}>  
                <List.Icon color={theme.colors.primary} icon="barcode-scan" />
                <Text style={styles.cardTextItem}>Código: {props.trackingCode}</Text>
            </View>

            <View style={styles.cardItem}>  
                <List.Icon color={theme.colors.primary} icon="truck-fast-outline" />
                <Paragraph>
                    <Text style={styles.cardTextItem}>Status: {props.lastSituation}</Text>
                </Paragraph>
            </View>

            <View style={styles.cardItem}>  
                <List.Icon color={theme.colors.primary} icon="google-maps" />
                <Text style={styles.cardTextItem}>Cidade: {props.city}</Text>
            </View>
            
            <View style={styles.cardItem}>  
                <List.Icon color={theme.colors.primary} icon="calendar-month-outline" />
                <Text style={styles.cardTextItem}>Data: {props.date}</Text>
                <List.Icon color={theme.colors.primary} icon="clock-check-outline" />
                <Text style={styles.cardTextItem}>Hora: {props.hour}</Text>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    cardItem : {
        width: 270,
        height: 60,
        alignItems: "center",
        flexDirection: 'row',
    },

    cardTextItem: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
});