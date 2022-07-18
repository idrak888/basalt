import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; 
import Colors from '../Colors';

const ToolTip = props => {
    return (
        <View style={props.show ? styles.wrapper : {...styles.wrapper, display: 'none'}}>
            <Text style={{color: Colors.dark, fontSize: 15}}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        width: '100%',
        borderLeftWidth: 5,
        borderLeftColor: Colors.red,
        backgroundColor: Colors.shadow
    }
});

export default ToolTip;