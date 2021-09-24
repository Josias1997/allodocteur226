import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { FirebaseContext } from "common";
import { useSelector, useDispatch } from "react-redux";

import { IMG01, IMG02, IMG03, IMG04 } from './img.jsx';

const  HomeBookDoctor = () => {
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.admin.doctors);

    useEffect(() => {
        dispatch(api.fetchUsers("doctor"));
    }, []);

    const settings = {
        width:400,
        dots:false,
      
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '10px',
        arrows: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                  
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                  
                }
            }
        ]

    };
    return(
        <section className="section section-doctor">
            <div className="container-fluid">
               <div className="row">
                    <div className="col-lg-4">
                        <div className="section-header ">
                            <h2>Réserver un rendez-vous</h2>
                            <p>Lorem Ipsum is simply dummy text </p>
                        </div>
                        <div className="about-content">
                            <p>Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text . The point of using Lorem Ipsum.</p>
                            <p>Lorem Ipsum is simply dummy text  Lorem Ipsum is simply dummy text  Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text </p>					
                            <Link to="" >Voir plus..</Link>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="doctor-slider slider">
                        
                            <Slider {...settings}>
                                {doctors.map(doctor => (
                                    <div key={doctor.id}>
                                        <div className="profile-widget">
                                            <div className="doc-img">
                                                <Link to="/patient/doctor-profile">
                                                    <img className="img-fluid" alt="User" src={IMG01} />
                                                </Link>
                                                <Link to="" className="fav-btn">
                                                <i className="far fa-bookmark"></i>
                                                </Link>
                                            </div>
                                            <div className="pro-content">
                                                <h3 className="title">
                                                <Link to="/patient/doctor-profile">{doctor.name}</Link> 
                                                    <i className="fas fa-check-circle verified"></i>
                                                </h3>
                                                <p className="speciality">{doctor.speciality}</p>
                                                <div className="rating">
                                                    {new Array(Math.floor(doctor.rating)).map((_, index) => <i key={index} className="fas fa-star filled"></i>)}
                                                    {new Array(5 - Math.round(doctor.rating)).map((_, index) => <i key={index} className="fas fa-star"></i>)}
                                                    <span className="d-inline-block average-rating">{doctor.total_ratings}</span>
                                                </div>
                                                <ul className="available-info">
                                                    <li>
                                                        <i className="fas fa-map-marker-alt"></i> {doctor.city}
                                                    </li>
                                                    <li>
                                                        <i className="far fa-clock"></i> Disponible le {doctor.availability}
                                                    </li>
                                                    <li>
                                                        <i className="far fa-money-bill-alt"></i> {doctor.price} 
                                                        <i className="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
                                                    </li>
                                                </ul>
                                                <div className="row row-sm">
                                                    <div className="col-6">
                                                    <Link to="/patient/doctor-profile" className="btn view-btn">Voir Profil</Link>
                                                    </div>
                                                    <div className="col-6">
                                                        <Link to="/patient/booking" className="btn book-btn">Rendez-vous</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                ))}
                            </Slider>    
                        </div>
                    </div>
               </div>
            </div>
        </section>
    );
};

export default HomeBookDoctor;