import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";

import { Link } from "react-router-dom";
import { DashboardSidebar } from "./sidebar/sidebar.jsx";
import { Tab, Tabs } from "react-bootstrap";
import moment from "moment";
import StickyBox from "react-sticky-box";

const Dashboard = () => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const appointments = useSelector((state) => state.patientdata.appointments);
  const prescriptions = useSelector(
    (state) => state.prescriptiondata.prescriptions
  );
  const medicalRecords = useSelector(
    (state) => state.medicalRecorddata.medicalRecords
  );
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (user) {
      dispatch(api.fetchPatientAppointments(user.id));
      dispatch(api.fetchPrescriptions(user.id));
      dispatch(api.fetchMedicalRecords(user.id));
    }
  }, [user]);

  const handleSelect = (key) => {
    setKey(key);
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
            <StickyBox offsetTop={20} offsetBottom={20}>
              <DashboardSidebar />
            </StickyBox>
          </div>
          <div className="col-md-7 col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body pt-0">
                <Tabs
                  className="tab-view"
                  activeKey={key}
                  onSelect={handleSelect}
                  id="controlled-tab-example"
                >
                  <Tab className="nav-item" eventKey={1} title="Consultations">
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Date Consultation</th>
                                <th>Date réservation</th>
                                <th>Montant</th>
                                <th>Statut</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                  <td>
                                    <span className="d-block text-info">
                                      {appointment.date}
                                    </span>
                                  </td>
                                  <td>
                                    {moment(
                                      appointment.timestamp.toDate()
                                    ).format("LL")}
                                  </td>
                                  <td>{appointment.speciality.price}</td>
                                  <td>
                                    <span className="badge badge-pill bg-success-light">
                                      Confirmé
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab className="nav-item" eventKey={2} title="Prescriptions">
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Date </th>
                                <th>Nom</th>
                                <th>Fichier</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prescriptions.map((prescription) => (
                                <tr key={prescription.id}>
                                  <td>
                                    {moment(
                                      prescription.timestamp.toDate()
                                    ).format("LL")}
                                  </td>
                                  <td>{prescription.name}</td>
                                  <td>
                                    <div className="table-action">
                                      <a
                                        href={prescription.fileUrl}
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Voir
                                        fichier
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    className="nav-item"
                    eventKey={3}
                    title="Medical Records"
                  >
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Date </th>
                                <th>Nom</th>
                                <th>Fichier </th>
                              </tr>
                            </thead>
                            <tbody>
                              {medicalRecords.map((medicalRecord) => (
                                <tr key={medicalRecord.id}>
                                  <td>
                                    {moment(
                                      medicalRecord.timestamp.toDate()
                                    ).format("LL")}
                                  </td>
                                  <td>{medicalRecord.name}</td>
                                  <td>
                                    <div className="table-action">
                                      <a
                                        href={medicalRecord.fileUrl}
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Voir
                                        fichier
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
