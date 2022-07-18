import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class ProjectScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Project overview</Text>
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

export default ProjectScreen;