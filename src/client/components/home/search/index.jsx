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
                            <h1>Rechercher un docteur, Prenez rendez-vous</h1>
                            <p>Découvrez les meilleurs docteurs, discutez ou réservez des consultations à domicile.</p>
                        </div>
                
                        <div className="search-box">
                            <form action="/home">
                                <div className="form-group search-location">
                                    <input type="text" className="form-control" placeholder="Lieu" />
                                    <span className="form-text">Selon votre localisation</span>
                                </div>
                                <div className="form-group search-info">
                                    <input type="text" className="form-control" placeholder="Recherche Docteurs, Maladies, Hôpital, Cliniques Etc" />
                                    <span className="form-text">Ex : Généraliste ou Dentiste ou Cardiologue etc</span>
                                </div>
                                <button onClick={() => this.props.history.push("/patient/search-doctor")} type="submit" className="btn btn-primary search-btn">  
                                 <FontAwesomeIcon icon={faSearch} /> <span>Recherche</span>
                                </button>
                            </form>
                        </div> 
                    </div>
                </div>
            </section>
        );
    }
}

export default homeSearch;
	
    