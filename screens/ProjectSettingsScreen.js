import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class ProjectSettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Project settings</Text>
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

export default ProjectSettingsScreen;