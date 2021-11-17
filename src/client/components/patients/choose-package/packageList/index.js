import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMG01 } from "./img";

const items = [
    {
        name: "Diament",
        description: "25 Consultations valables toute l'année",
        image: IMG01,
        number: 20,
        price: 200000,
    },
    {
        name: "Platine",
        description: "15 Consultations valables toute l'année",
        image: IMG01,
        number: 15,
        price: 100000,
    },
    {
        name: "Or",
        description: "7 Consultations valables toute l'année",
        image: IMG01,
        number: 7,
        price: 50000,
    },
];

const PackageList = () => {
    const user = useSelector((state) => state.auth.user);
    const setSpeciality = (item) => {
        localStorage.setItem("@speciality", JSON.stringify(item));
    };
    return (
        <div>
            {items.map((item) => (
                <div className="card" key={item.name}>
                    <div className="card-body">
                        <div className="doctor-widget">
                            <div className="doc-info-left">
                                <div className="doctor-img">
                                    <Link to="/patient/doctor-profile">
                                        <img
                                            src={IMG01}
                                            className="img-fluid"
                                            alt="User"
                                        />
                                    </Link>
                                </div>
                                <div className="doc-info-cont">
                                    <h4 className="doc-name">
                                        <Link to="/patient/doctor-profile">
                                            {item.name}
                                        </Link>
                                    </h4>
                                    <p>{item.description}</p>
                                    <div className="clinic-services">
                                        <span>{item.price} FCFA</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doc-info-right">
                                <div className="clinic-booking">
                                    <Link
                                        onClick={() => setSpeciality(item)}
                                        to="/patient/checkout"
                                        className="apt-btn"
                                    >
                                        Réserver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageList;
