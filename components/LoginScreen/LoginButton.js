import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.onPress()} style={{...styles.customButton, backgroundColor: props.color}}>
            <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
            <Image style={[styles.loader, props.loaderStyle]} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif'}}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    customButton: {
        padding: 12,
        marginTop: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    loader: {
        width: 20,
        height: 20,
        padding: 10,
        display: 'none'
    }
});

export default LoginButton;