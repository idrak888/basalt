import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

const ProjectCapsule = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.projectCapsule}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.name}</Text>
                <Text style={{color: Colors.dark}}>{props.activeBugs} active bugs</Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    projectCapsule: {
        padding: 15,
        width: '100%',
        marginTop: 6,
        backgroundColor: 'white',
        borderLeftWidth: 3,
        borderColor: Colors.primary
    }
});

export default ProjectCapsule;