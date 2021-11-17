import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';

import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from "moment";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

const Booking = () => {
	const { api } = useContext(FirebaseContext);
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const [startDate, setStartDate] = useState(moment());
	const [endDate, setEndDate] = useState(moment().add(6, 'd'));
	const [dates, setDates] = useState([]);
	const [datePage, setDatePage] = useState(0);
	const [currentDate, setCurrentDate] = useState(startDate);
	const [timeSlot, setTimeSlot] = useState(9);
	const location = useLocation();
	const history = useHistory();
	const bookingType = localStorage.getItem("@bookingType");
	if (!bookingType) {
		return <Redirect to="/" />
	}
	if (!location.speciality) {
		return <Redirect to={`/patient/choose-speciality/${bookingType}`} />
	}

	useEffect(() => {
		const newDates = [];
		let dateCursor = moment(startDate).add(datePage * 6, 'd');
		let maxDate = moment(startDate).add((datePage + 1) * 6, 'd') >= endDate ? endDate : moment(startDate).add((datePage + 1) * 6, 'd');
		while(dateCursor <= maxDate){
			newDates.push(dateCursor);
			dateCursor = moment(dateCursor).add(1, 'd');
		}
		setDates(newDates);
		setCurrentDate(startDate);
	}, [startDate, endDate, datePage])

	const handleEvent = (event, picker) => {
		setDatePage(0);
		setStartDate(picker.startDate);
		setEndDate(picker.endDate);
	};
	const handleCallback = (start, end, label) => {
		setDatePage(0);
		setStartDate(start);
		setEndDate(end);
	};
	const handleTimeSelect = (date, time) => {
		localStorage.setItem("@timeSlot", timeSlot);
		localStorage.setItem("@date", moment(date).format("L"));
		localStorage.setItem("@speciality", JSON.stringify(location.speciality))
		setCurrentDate(date);
		setTimeSlot(time);
	};

	const useInsurance = () => {
		dispatch(api.createAppointment({
			patient: {
				...user
			},
			date: `${localStorage.getItem("@date")} ${localStorage.getItem("@timeSlot")}:00`,
			speciality: location.speciality,
			type: bookingType
		}));
		dispatch(api.updateUser(user.id, {
			insurance: {
				...user.insurance,
				number: user.insurance.number > 0 ? user.insurance.number - 1 : 0
			}
		}));
		localStorage.setItem("@speciality", JSON.stringify(location.speciality))
		history.push('/patient/booking-success');
	}
  return(
    <div>
	    <div className="breadcrumb-bar">
		    <div className="container-fluid">
		        <div className="row align-items-center">
		            <div className="col-md-12 col-12">
		                <nav aria-label="breadcrumb" className="page-breadcrumb">
		                    <ol className="breadcrumb">
		                        <li className="breadcrumb-item"><Link to="/home">Accueil</Link></li>
		                        <li className="breadcrumb-item active" aria-current="page">Réservation</li>
		                    </ol>
		                </nav>
		                <h2 className="breadcrumb-title">Réservation</h2>
		            </div>
		        </div>
		    </div>
			</div>
			<div className="content">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="booking-doc-info">
										<div className="booking-doc-img">
											<img src={IMG01} alt="User" />
										</div>
										<div className="booking-info">
											<h4>{location.speciality.name}</h4>
											<p className="text-muted mb">{location.speciality.price} FCFA</p>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12 col-sm-4 col-md-6">
									<h4 className="mb-1">{moment(currentDate).format('LL')}</h4>
									<p className="text-muted">{days[moment(currentDate).day()]}</p>
								</div>
								<div className="col-12 col-sm-8 col-md-6 text-sm-right">
								<div className="datepicker-icon">
							   	<i className="far fa-calendar-alt mr-2"></i>
									<DateRangePicker
										initialSettings={{
											startDate: startDate,
											endDate: endDate,
											timePicker: false
										}}
										onEvent={handleEvent}
										onCallback={handleCallback}
										>
											<input
												className="form-control col-4 input-range"
												type="text"
												custom="input-range"
											/>
									</DateRangePicker>
									<i className="fas fa-chevron-down ml-2"></i>
									</div>
								</div>
              </div>
							<div className="card booking-schedule schedule-widget">
								<div className="schedule-header">
									<div className="row">
										<div className="col-md-12">
											<div className="day-slot">
												<ul>
													<li className="left-arrow">
														<Link to="">
															<i className="fa fa-chevron-left"></i>
														</Link>
													</li>
													{dates.map((date, index) => (<li key={index}>
														<span>{days[moment(date).day()]} </span>
														<span className="slot-date">
															{moment(date).date()} {months[moment(date).month()]}
															<small className="slot-year"> {moment(date).year()}</small>
														</span>
													</li>))}
													<li className="right-arrow">
													   <Link to="">
															<i className="fa fa-chevron-right"></i>
														</Link>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="schedule-cont">
									<div className="row">
										<div className="col-md-12">
											<div className="time-slot">
												<ul className="clearfix">
													{dates.map((date, index) => <li key={index}>
														<button
															className={`timing ${(currentDate == date && timeSlot === 9) ? "selected" : ""}`}
															onClick={() => handleTimeSelect(date, 9)}
														>
															<span>9:00</span>
														</button>
														<button
															className={`timing ${(currentDate == date && timeSlot === 10) ? "selected" : ""}`}
															onClick={() => handleTimeSelect(date, 10)}
														>
															<span>10:00</span>
														</button>
														<button
															className={`timing ${(currentDate == date && timeSlot === 11) ? "selected" : ""}`}
															onClick={() => handleTimeSelect(date, 11)}
														>
															<span>11:00</span>
														</button>
													</li>)}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="submit-section proceed-btn text-right">
								{user?.insurance?.number > 0 && <button onClick={useInsurance} className="btn btn-primary submit-btn mr-3 my-2">Utiliser l'assurance</button>}
								<Link to="/patient/checkout" className="btn btn-primary submit-btn mr-3 my-2">Procéder au paiement</Link>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
  );

}
export default Booking;
