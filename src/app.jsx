import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "common";
import { useDispatch } from "react-redux";
import { Route } from 'react-router-dom';

import AppContainer from "./appcontainer";

const App = (props) => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(api.isUserLoggedIn());
	}, []);

    return(
        <Route render={(props)=> <AppContainer {...props}/>} />
    );
    
}


export default App;