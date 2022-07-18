import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'; 
import { Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../Colors';
import axios from 'axios';

class EditModal extends Component {
    state = {
        newSkill: '',
        errorMessage: '',
        loading: false
    }
    updateNewSkill = newSkill => {
        this.setState({newSkill});
    }
    applyChanges = property => {
        this.setState({errorMessage: '', loading: true});

        if (this.state.newSkill !== null && this.state.newSkill.length > 0) {
            axios.post(`https://basalt-api.herokuapp.com/user/update/skills/${this.props._id}`, {
                skill: this.state.newSkill
            })
            .then(res => {
                var skillsArr = res.data.skills;
                skillsArr.push(this.state.newSkill);

                this.props.updateUserSkills(skillsArr);
                this.props.toggleAddSkillModal();
                this.setState({loading: false, newSkill: ''});
            }).catch(e => {
                this.setState({loading: false});
                console.log(e);
            });
        } else {
            this.setState({errorMessage: 'Skill cannot be empty.', loading: false});
        }
    }
    render () {
        return (
            <Overlay overlayStyle={styles.overlay} isVisible={this.props.showAddSkillModal}>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderBottomColor: Colors.shadow, borderBottomWidth: 1}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.dark}}>Add new skill</Text>
                        <Icon onPress={this.props.toggleAddSkillModal} name="close" size={20} color="grey"/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Describe your skill</Text>
                        <Input
                            value={this.state.newSkill}
                            placeholder="E.g: React.js, photoshop, ect."
                            inputContainerStyle={{borderBottomColor: 'transparent'}}
                            containerStyle={{backgroundColor: '#EEEE', borderRadius: 8}}
                            inputStyle={{color: Colors.dark}}
                            onChangeText={value => this.updateNewSkill(value)}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.errorMessage}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.applyChanges('bio')} style={{
                        ...styles.buttonStyle,
                        backgroundColor: Colors.primary
                    }}>
                        <Text style={this.state.loading ? {display: 'none'} : {color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Add to portfolio!</Text>
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