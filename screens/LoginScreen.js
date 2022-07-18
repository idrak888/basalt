import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    Image, 
    TouchableWithoutFeedback, 
    Keyboard, 
    StatusBar, 
    KeyboardAvoidingView, 
    Platform,
    AsyncStorage
} from 'react-native';
import InputContainer from '../components/LoginScreen/InputContainer';
import LoginButton from '../components/LoginScreen/LoginButton';
import * as firebase from 'firebase';
import axios from 'axios';

import logo from '../assets/logo.png';

const Colors = {
    primary: '#1379DF',
    secondary: '#10C660',
    dark: '#3B3B3B'
}

var firebaseConfig = {
    apiKey: "AIzaSyApUxli2we7SQeoYOiA0vHLU5YpS6NKbJ8",
    authDomain: "basalt-1ad57.firebaseapp.com",
    databaseURL: "https://basalt-1ad57.firebaseio.com",
    projectId: "basalt-1ad57",
    storageBucket: "basalt-1ad57.appspot.com",
    messagingSenderId: "153961055476",
    appId: "1:153961055476:web:38e3c15ab73cb92f3ecaa1"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

class LoginScreen extends Component {
    state = {
        formState: 'signup',
        username: {value: '', error: ''},
        email: {value: '', error: ''},
        password: {value: '', error: ''},
        loading: false
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user != {} && user != null && user !== '{}') {
                console.log(user);
                this.props.navigation.navigate('HomeScreen');
            } 
        } catch (e) {
            console.log(e);
        }
    }
    updateUsername = value => this.setState({username: {value, error: ''}});
    updateEmail = value => this.setState({email: {value, error: ''}});
    updatePassword = value => this.setState({password: {value, error: ''}});

    handleSignup = () => {
        Keyboard.dismiss();
        this.setState({loading: true});
        var errors = false;
        var errorMessage = "This field can't be empty.";

        const username = this.state.username.value;
        const email = this.state.email.value;
        const password = this.state.password.value;
        
        if (username.length < 1) {
            errors = true;
            this.setState({username: {value: '', error: errorMessage}});
        } if (email.length < 1) {
            errors = true;
            this.setState({email: {value: '', error: errorMessage}});
        } if (password.length < 1) {
            errors = true;
            this.setState({password: {value: '', error: errorMessage}});
        } 

        if (!errors) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(doc => {
                axios.post('https://basalt-api.herokuapp.com/users', {
                    uid: doc.user.uid,
                    username,
                    email
                }).then(res => {
                    console.log(res);
                    this.setState({loading: false});

                    this.storeUser(doc.user);
                    this.props.navigation.navigate('HomeScreen');
                }).catch(e => {
                    this.setState({username: {value: '', error: 'Username already in use.'}, loading: false});
                });
            }).catch((error) => {
                error.message.includes('email') ? this.setState({email: {value: '', error: error.message}, loading: false})
                : this.setState({password: {value: '', error: error.message}, loading: false});
            });
        } else {
            this.setState({loading: false});
        }
    }
    handleLogin = () => {
        Keyboard.dismiss();
        this.setState({loading: true});
        var errors = false;
        var errorMessage = "This field can't be empty.";

        const email = this.state.email.value;
        const password = this.state.password.value;

        if (email.length < 1) {
            errors = true;
            this.setState({email: {value: '', error: errorMessage}});
        } if (password.length < 1) {
            errors = true;
            this.setState({password: {value: '', error: errorMessage}});
        } 

        if (!errors) {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(doc => {
                this.setState({loading: false});

                this.storeUser(doc.user);
                this.props.navigation.navigate('HomeScreen');
            }).catch(error => {
                error.message.includes('email') ? this.setState({email: {value: '', error: error.message}, loading: false})
                : this.setState({password: {value: '', error: error.message}, loading: false});
            });
        } else {
            this.setState({loading: false});
        }
    }
    storeUser(user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <StatusBar translucent {...this.props} barStyle="light-content" />
                </View>
                <View style={{flex: 1}}></View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.formWrapper}>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 15}}>
                            <Image source={logo} style={styles.logo}/>
                        </View>{ this.state.formState === 'signup' ? <InputContainer 
                            value={this.state.username.value}
                            label="Username"
                            placeholder="John Doe"
                            iconName="user"
                            iconSize={23}
                            returnKey="next"
                            updateInputValue={this.updateUsername}
                            errorMessage={this.state.username.error}
                        /> : <Text></Text> }
                        <InputContainer 
                            value={this.state.email.value}
                            label="Your Email Address"
                            placeholder="johndoe@gmail.com"
                            iconName="envelope"
                            iconSize={20}
                            returnKey="next"
                            updateInputValue={this.updateEmail}
                            errorMessage={this.state.email.error}
                        />
                        <InputContainer
                            value={this.state.password.value}
                            secureTextEntry={true}
                            label={ this.state.formState === 'signup' ? "New Password" : "Your Password"}
                            placeholder="Password"
                            iconName="lock"
                            iconSize={23}
                            returnKey="go"
                            updateInputValue={this.updatePassword}
                            errorMessage={this.state.password.error}
                        />
                        {
                            this.state.formState === 'signup' ?
                                <View style={{flexDirection: 'column'}}>
                                    <LoginButton 
                                        onPress={!this.state.loading ? this.handleSignup:() => {}} 
                                        textStyle={this.state.loading ? {display: 'none'}:{display: 'flex'}} 
                                        loaderStyle={this.state.loading ? {display: 'flex'}:{display: 'none'}} 
                                        text="Sign up" 
                                        color={Colors.primary}
                                    />
                                    <LoginButton onPress={() => {
                                        this.setState({formState: 'login'});
                                    }} text="Log in instead" color={Colors.secondary}/>
                                </View>
                                :    
                                <View style={{flexDirection: 'column'}}>
                                    <LoginButton 
                                        onPress={!this.state.loading ? this.handleLogin:() => {}} 
                                        textStyle={this.state.loading ? {display: 'none'}:{display: 'flex'}} 
                                        loaderStyle={this.state.loading ? {display: 'flex'}:{display: 'none'}} 
                                        text="Log in" 
                                        color={Colors.primary}
                                    />
                                    <LoginButton onPress={() => {
                                        this.setState({formState: 'signup'});
                                    }} text="Create a new account" color={Colors.secondary}/>
                                </View>
                        }
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    formWrapper: {
        padding: 30,
        flex: 10, 
        width: '100%', 
        borderWidth: 1, 
        borderRadius: 20, 
        backgroundColor: 'white',
        borderColor: 'white'
    },
    logo: {
        width: 140,
        height: 40
    }
});

export default LoginScreen;