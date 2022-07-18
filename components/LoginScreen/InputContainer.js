import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Colors';

const InputContainer = props => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{props.label}</Text>
            <Input
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                inputContainerStyle={{backgroundColor: '#EEEE', borderColor: 'transparent', borderRadius: 8}}
                inputStyle={{color: Colors.dark}}
                leftIcon={
                    <Icon
                        name={props.iconName}
                        size={props.iconSize}
                        color='grey'
                        style={{paddingRight: 10, marginLeft: -5}}
                    />
                }
                returnKeyType={props.returnKey}
                autoCapitalize="none"
                onChangeText={value => props.updateInputValue(value)}
                errorStyle={{ color: 'red' }}
                errorMessage={props.errorMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 15
    },
    label: {
        padding: 5,
        fontSize: 16,
        color: Colors.dark,
        fontWeight: 'bold'
    }
});

export default InputContainer;