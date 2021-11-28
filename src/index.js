import { StylesProvider } from '@mui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store/store';
import './styles.css';
// import reportWebVitals from './reportWebVitals';
import RouteComponent from './Routes';

ReactDOM.render(
  <StylesProvider injectFirst>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteComponent />
      </PersistGate> 
    </Provider>
  </StylesProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
