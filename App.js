import React from 'react';
import MainNavigator from './navigation/MainNavigator';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import mainReducer from './reducers/mainReducer';

export default class App extends React.Component {
  reducer = combineReducers({
    mainReducer
  });

  store = createStore(this.reducer);

  render () {
    return (
      <Provider store={this.store}>
        <MainNavigator/>
      </Provider>
    )
  }
}