import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tooltip from '../ToolTip';

import Colors from '../../Colors';

const ProfileDetails = props => {
    const getInitials = username => {
        var nameArray = username.split("");
        var spaces = [];
        nameArray.map((char, index) => {
            if (char == " ") {
                spaces.push(index);
            }
        });
        
        var firstName = nameArray.slice(0, spaces[0]);
        var lastName = nameArray.slice(spaces[0]+1);

        return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    }
    return (
        <View style={{...styles.innerContainer, borderColor: Colors.primary, borderWidth: 2}}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Icon 
                    onPress={props.toggleEditModal} 
                    name="edit" 
                    size={20} 
                    color={Colors.dark}
                    style={{paddingHorizontal: 8}}
                />
                <Icon 
                    onPress={props.toggleOverlay} 
                    name="sign-out" 
                    size={23} 
                    color={Colors.red}
                />
            </View>
            <Avatar size="medium" rounded title={getInitials(props.username)} containerStyle={{marginBottom: 10}}/>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.username}</Text>
            <Text style={{fontSize: 15, color: Colors.dark, textAlign: 'center'}}>{props.bio}</Text>
            <Tooltip show={props.bio.length < 1}>You can edit your profile to add a bio and a profile picture</Tooltip>
        </View>
    );
};

const styles = StyleSheet.create({
    profilePic: {
        width: 80,
        height: 80,
        marginVertical: 10
    },
    innerContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'transparent',
        backgroundColor: 'white',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
        shadowOffset: {width: 4,  height: 4,},
        shadowColor: Colors.shadow,
        shadowOpacity: 1
    }
});

export default ProfileDetails;