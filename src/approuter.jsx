import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store, FirebaseProvider } from "common";

import App from './app.jsx';

const AppRouter = (props) => {
    return(
        <Provider store={store}>
            <FirebaseProvider>
                <Router>
                    <App />
                </Router>
            </FirebaseProvider>
        </Provider>
    );
    
}


export default AppRouter;