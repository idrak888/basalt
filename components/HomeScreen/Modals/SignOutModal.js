import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import Colors from '../../../Colors';

const SignOutModal = props => {
    return (
        <Overlay overlayStyle={styles.overlay} isVisible={props.showOverlay} onBackdropPress={props.toggleOverlay}>
            <View>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Are you sure you want to sign out?</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={props.signOut} style={{
                    ...styles.buttonStyle,
                    backgroundColor: Colors.red,
                    marginTop: 10
                }}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: {
        height: 'auto',
        width: '85%',
        justifyContent: 'center',
        padding: 30,
        alignItems: 'center'
    },
    buttonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent'
    }
});

export default SignOutModal;