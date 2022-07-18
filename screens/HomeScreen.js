import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import axios from 'axios';
import SkeletonContent from "react-native-skeleton-content";

import SignOutModal from '../components/HomeScreen/Modals/SignOutModal';
import EditModal from '../components/HomeScreen/Modals/EditModal';
import AddSkillModal from '../components/HomeScreen/Modals/AddSkillModal';
import CreateProjectModal from '../components/HomeScreen/Modals/CreateProjectModal';
import ProfileDetails from '../components/HomeScreen/ProfileDetails';
import Tooltip from '../components/ToolTip';
import ProjectCapsule from '../components/HomeScreen/ProjectCapsule';
import Colors from '../Colors';
import { connect } from 'react-redux';

class HomeScreen extends Component {
    state = {
        user: {_id: "", username: "John Doe", bio: "", skills: [], projects: []},
        showOverlay: false,
        showEditModal: false,
        showAddSkillModal: false,
        showCreateProjectModal: false,
        loading: false
    }
    componentDidMount() {
        this.setState({loading: true});
        this.fetchUser();
    }
    fetchUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user == {} || user == null || user == '{}') {
                this.props.navigation.navigate('LoginScreen');
            } else {
                axios.get(`https://basalt-api.herokuapp.com/users/${JSON.parse(user).uid}`)
                .then(doc => {
                    this.setState({user: doc.data[0]});
                    this.updateRedux(doc.data[0].profile_pic, doc.data[0].bio, doc.data[0].skills);
                    this.setState({loading: false});
                    console.log(doc.data[0]);
                }).catch(e => {
                    console.log(e);
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    updateRedux = (profilePic, bio, skills) => {
        this.props.updateProfilePic(profilePic);
        this.props.updateUserBio(bio);
        this.props.updateUserSkills(skills);
    }
    signOut = () => {
        firebase.auth().signOut().then(res => {
            //empty async storage
            this.removeUser({});
            //empty redux
            this.updateRedux('', '', '');
            //navigate back to login page
            this.props.navigation.navigate('LoginScreen');
        }).catch(e => {
            console.log(e);
        });
    }
    toggleOverlay = () => this.setState({showOverlay:!this.state.showOverlay});
    toggleEditModal = () => this.setState({showEditModal:!this.state.showEditModal});
    toggleAddSkillModal = () => this.setState({showAddSkillModal:!this.state.showAddSkillModal});
    toggleCreateProjectModal = () => this.setState({showCreateProjectModal:!this.state.showCreateProjectModal});
    removeUser(user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
    }
    deleteSkill = index => {
        const skills = this.props.userSkills;
        const skillToDelete = skills[index];

        Alert.alert(
            "Confirm deletion",
            `Are you sure you want to delete ${skillToDelete} from your skills?`,
            [
                {
                    text: "Delete",
                    onPress: () => {
                        axios.post(`https://basalt-api.herokuapp.com/user/update/skills/${this.state.user._id}`, {
                            skill: skillToDelete
                        })
                        .then(res => {
                            skills.splice(index, 1);

                            this.props.updateUserSkills(skillsArr);
                        }).catch(e => {
                            this.setState({loading: false});
                            console.log(e);
                        });
                    }
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <SignOutModal showOverlay={this.state.showOverlay} toggleOverlay={this.toggleOverlay} signOut={this.signOut}/>
                <EditModal _id={this.state.user._id} currentBio={this.props.userBio} updateUserBio={newBio => this.props.updateUserBio(newBio)} toggleEditModal={this.toggleEditModal} showEditModal={this.state.showEditModal}/>
                <AddSkillModal _id={this.state.user._id} updateUserSkills={newSkills => this.props.updateUserSkills(newSkills)} toggleAddSkillModal={this.toggleAddSkillModal} showAddSkillModal={this.state.showAddSkillModal}/>
                <CreateProjectModal _id={this.state.user._id} username={this.state.user.username} toggleCreateProjectModal={this.toggleCreateProjectModal} showCreateProjectModal={this.state.showCreateProjectModal}/>

                <SkeletonContent
                    containerStyle={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}
                    isLoading={this.state.loading}
                    layout={[
                        { key: "someId", width: 400, height: 150, marginBottom: 10 },
                        { key: "someOtherId", width: 400, height: 80, marginBottom: 10 },
                        { key: "someOtherId2", width: 400, height: 80, marginBottom: 10 }
                    ]}
                >
                    <ProfileDetails toggleEditModal={this.toggleEditModal} username={this.state.user.username} bio={this.props.userBio} toggleOverlay={this.toggleOverlay}/>
                    <View style={{...styles.innerContainer, alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.dark}}>
                            Skills <Icon onPress={this.toggleAddSkillModal} name="plus" size={18} color={Colors.secondary}/>
                        </Text>
                        <Tooltip show={this.props.userSkills.length < 1}>Display your skills/professions here</Tooltip>
                        <ScrollView horizontal={true} style={{flexDirection: 'row', paddingVertical: 12}}>
                            {this.props.userSkills.map((skill, index) => {
                                return (
                                    <TouchableOpacity onPress={() => this.deleteSkill(index)} activeOpacity={0.8} key={index} style={{
                                        ...styles.buttonStyle,
                                        backgroundColor: Colors.primary
                                    }}>
                                        <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{skill}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView> 
                    </View>
                    <View style={{...styles.innerContainer, alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.dark}}>
                            Projects 
                        </Text>
                        <Text style={{fontSize: 16, color: Colors.dark}}>
                            You are currently in {this.state.user.projects.length} project(s).
                        </Text>
                        <TouchableOpacity activeOpacity={0.8} style={{
                            ...styles.buttonStyle,
                            backgroundColor: Colors.primary,
                            marginTop: 10
                        }}>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Join a project</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleCreateProjectModal} activeOpacity={0.8} style={{
                            ...styles.buttonStyle,
                            backgroundColor: Colors.secondary,
                            marginTop: 5,
                            marginBottom: 10
                        }}>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Create new <Icon name="plus" size={10} color="white"/></Text>
                        </TouchableOpacity>
                        <Tooltip show={this.state.user.projects.length < 1}>Join an existing project or create a new one as an admin</Tooltip>
                    </View>
                    {this.state.user.projects.map((project, index) => <ProjectCapsule key={index} name={project.name} activeBugs={project.activeBugs}/>)}
                </SkeletonContent>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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
    },
    buttonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent',
        marginRight: 5
    }
});

const mapStateToProps = state => {
    return { userProfilePic: state.mainReducer.profilePic, userBio: state.mainReducer.userBio, userSkills: state.mainReducer.userSkills }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfilePic: updatedProfilePic => dispatch({ type: 'UPDATE_USER_PROFILE_PIC', updatedProfilePic }),
        updateUserBio: updatedBio => dispatch({ type: 'UPDATE_USER_BIO', updatedBio }),
        updateUserSkills: updatedSkills => dispatch({ type: 'UPDATE_USER_SKILLS', updatedSkills })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);