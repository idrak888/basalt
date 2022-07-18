import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'; 
import { Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../Colors';
import axios from 'axios';

class EditModal extends Component {
    state = {
        newBio: this.props.currentBio,
        loading: false
    }
    updateNewBio = newBio => this.setState({newBio});
    applyNewBio = () => {
        this.setState({loading: true});

        axios.post(`https://basalt-api.herokuapp.com/user/update/bio/${this.props._id}`, {
            bio: this.state.newBio
        })
        .then(res => {
            this.setState({loading: false});
            this.props.updateUserBio(this.state.newBio);
            this.props.toggleEditModal();
        }).catch(e => {
            this.setState({loading: false});
            console.log(e);
        });
    }
    render () {
        return (
            <Overlay overlayStyle={styles.overlay} isVisible={this.props.showEditModal}>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderBottomColor: Colors.shadow, borderBottomWidth: 1}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.dark}}>Edit profile</Text>
                        <Icon onPress={this.props.toggleEditModal} name="close" size={20} color="grey"/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Profile picture</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Profile bio</Text>
                        <Input
                            value={this.state.newBio}
                            placeholder="Describe yourself"
                            inputContainerStyle={{borderBottomColor: 'transparent'}}
                            containerStyle={{backgroundColor: '#EEEE', borderRadius: 8}}
                            inputStyle={{color: Colors.dark}}
                            onChangeText={value => this.updateNewBio(value)}
                            errorStyle={{ color: 'red' }}
                            errorMessage={""}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.applyNewBio} style={{
                        ...styles.buttonStyle,
                        backgroundColor: Colors.primary
                    }}>
                        <Text style={this.state.loading ? {display: 'none'} : {color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Update bio</Text>
                        <Image style={this.state.loading ? styles.loader : {display: 'none'}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif'}}/>
                    </TouchableOpacity>
                </View>
            </Overlay>
        );
    }
};

const styles = StyleSheet.create({
    overlay: {
        width: '90%',
        padding: 30,
        height: 'auto'
    },
    image: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        alignSelf: 'center', 
        marginVertical: 20
    },
    inputContainer: {
        marginVertical: 20
    },
    label: {
        padding: 5,
        fontSize: 16,
        color: Colors.dark,
        fontWeight: 'bold'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent'
    },
    loader: {
        width: 20,
        height: 20,
        padding: 10
    }
});

export default EditModal;