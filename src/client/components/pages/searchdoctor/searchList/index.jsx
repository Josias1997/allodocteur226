import React from 'react';
import { Link } from 'react-router-dom';
import {IMG01} from './img';

const specialities = [
  {
    name: "Cardiologue",
    image: IMG01,
    price: 10000
  },
  {
    name: "Pédiatre",
    image: IMG01,
    price: 10000
  },
  {
    name: "Neurologue",
    image: IMG01,
    price: 10000
  },
  {
    name: "Urologue",
    image: IMG01,
    price: 10000
  },
  {
    name: "Dentiste",
    image: IMG01,
    price: 10000
  },
  {
    name: "Généraliste",
    image: IMG01,
    price: 10000
  },
  {
    name: "Test Paludisme",
    image: IMG01,
    price: 5000
  },
  {
    name: "Test Fièvre Typhoïde",
    image: IMG01,
    price: 15000
  },
  {
    name: "Test Dengue",
    image: IMG01,
    price: 20000
  },
  {
    name: "Test Covid",
    image: IMG01,
    price: 25000
  },
  {
    name: "Glycémie Veineuse",
    image: IMG01,
    price: 5000
  },
  {
    name: "Examen biologique général (Cardiaque, Foie, Reins, Poumons ...)",
    image: IMG01,
    price: 200000
  },
];

const SearchList = () => {
  return(
    <div>
        {specialities.map(speciality => <div className="card" key={speciality.name}>
            <div className="card-body">
                <div className="doctor-widget">
                    <div className="doc-info-left">
                        <div className="doctor-img">
                        <Link to="/patient/doctor-profile">
                                <img src={IMG01} className="img-fluid" alt="User" />
                           </Link>
                        </div>
                        <div className="doc-info-cont">
                            <h4 className="doc-name"><Link to="/patient/doctor-profile">{speciality.name}</Link></h4>
                            <div className="clinic-services">
                                <span>{speciality.price} FCFA</span>
                            </div>
                        </div>
                    </div>
                    <div className="doc-info-right">
                        <div className="clinic-booking">
                            <Link to={{
                                pathname: `/patient/booking/`,
                                speciality: speciality
                              }} className="apt-btn">Réserver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>)}
      </div>
  );
}

export default SearchList;
