import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class homeSearch extends Component{
    render(){
        return(
            <section className="section section-search">
                <div className="container-fluid">
                    <div className="banner-wrapper">
                        <div className="banner-header text-center">
                            <h1>AlloDocteur226</h1>
                            <p>Réserver facilement des consultations en ligne ou à domicile.</p>
                        </div> 
                    </div>
                </div>
            </section>
        );
    }
}

export default homeSearch;
	
    