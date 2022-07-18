import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

class BugBoardScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Bug board</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default BugBoardScreen;