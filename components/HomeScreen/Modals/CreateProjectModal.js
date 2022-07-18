import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'; 
import { Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../Colors';
import axios from 'axios';

class CreateProjectModal extends Component {
    state = {
        loading: false,
        teamName: '',
        role: '',
        teamNameError: '',
        roleError: ''
    }
    updateTeamName = teamName => this.setState({teamName, teamNameError: ''});
    updateRole = role => this.setState({role, roleError: ''});

    createProject = () => {
        this.setState({loading: true});
        const teamName = this.state.teamName;
        const role = this.state.role;

        if (teamName == '' || teamName.length < 3) {
            this.setState({teamNameError: 'Team name provided too short'});
        } else if (role == '') {
            this.setState({roleError: 'Invalid role'});
        } else {
            const body = {
                teamName,
                members: [
                    {
                        username: this.props.username,
                        userId: this.props._id,
                        admin: true,
                        role
                    }
                ]
            }
            axios.post('https://basalt-api.herokuapp.com/project/create', body)
            .then(doc => {
                console.log(doc);
                this.setState({loading: false, teamName: '', role: ''});
            }).catch(e => {
                console.log(e);
                this.setState({loading: false, teamName: '', role: ''});
            });
        }
    }
    render() {
        return (
            <Overlay overlayStyle={styles.overlay} isVisible={this.props.showCreateProjectModal}>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderBottomColor: Colors.shadow, borderBottomWidth: 1}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.dark}}>Create a new project</Text>
                        <Icon onPress={this.props.toggleCreateProjectModal} name="close" size={20} color="grey"/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Team Name</Text>
                        <Input
                            value={this.state.teamName}
                            placeholder="e.g: Basalt developers"
                            inputContainerStyle={{borderBottomColor: 'transparent'}}
                            containerStyle={{backgroundColor: '#EEEE', borderRadius: 8}}
                            inputStyle={{color: Colors.dark}}
                            onChangeText={value => this.updateTeamName(value)}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.teamNameError}
                            autoFocus={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Role</Text>
                        <Input
                            value={this.state.role}
                            placeholder="e.g: Lead developer"
                            inputContainerStyle={{borderBottomColor: 'transparent'}}
                            containerStyle={{backgroundColor: '#EEEE', borderRadius: 8}}
                            inputStyle={{color: Colors.dark}}
                            onChangeText={value => this.updateRole(value)}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.roleError}
                            autoFocus={true}
                        />
                    </View>
                    <View style={styles.overview}>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.state.teamName == '' ? 'Team Name' : this.state.teamName}</Text>
                        <Text style={{color: '#AAAAAA'}}>Creating as: {this.props.username}</Text>
                    </View>
                    <TouchableOpacity onPress={this.createProject} activeOpacity={0.8} style={{
                        ...styles.buttonStyle,
                        backgroundColor: Colors.primary
                    }}>
                        <Text style={this.state.loading ? {display: 'none'} : {color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Launch!</Text>
                        <Image style={this.state.loading ? styles.loader : {display: 'none'}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif'}}/>
                    </TouchableOpacity>
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        width: '90%',
        padding: 30,
        height: 'auto'
    },
    inputContainer: {
        marginVertical: 20
    },
    overview: {
        padding: 30,
        borderRadius: 6,
        marginVertical: 20,
        backgroundColor: '#FAFAFA',
        borderColor: Colors.primary,
        borderWidth: 1
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

export default CreateProjectModal;