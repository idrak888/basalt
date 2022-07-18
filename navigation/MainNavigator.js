import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProjectScreen from '../screens/ProjectScreen';
import BugBoardScreen from '../screens/BugBoardScreen';
import ProjectSettingsScreen from '../screens/ProjectSettingsScreen';

const Colors = {
    primary: '#1379DF',
    secondary: '#10C660',
    dark: '#3B3B3B'
}

const ProjectNavigator = createBottomTabNavigator({
    ProjectScreen: {
        screen: ProjectScreen
    },
    BugBoardScreen: {
        screen: BugBoardScreen
    },
    ProjectSettingsScreen: {
        screen: ProjectSettingsScreen
    }
});

const HomeNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            headerLeft: () => null,
            title: 'Basalt Dashboard',
            headerStyle: {
                backgroundColor: Colors.primary
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontSize: 20
            },
            gestureEnabled: false
        }
    }
});

const MainNavigator = createStackNavigator({
    HomeNavigator: {
        screen: HomeNavigator, 
        navigationOptions: {
            header: () => null
        }
    },
    ProjectNavigator: {
        screen: ProjectNavigator
    }
});

export default createAppContainer(MainNavigator);