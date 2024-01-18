import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import  {BrowserRouter} from "react-router-dom";
import App from './App';
import Header from './components/Header'
import { AuthProvider } from './components/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <AuthProvider>
        <Header/>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.Fragment>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

