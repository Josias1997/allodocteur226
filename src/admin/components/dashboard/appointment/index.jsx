import React, { useState, useContext } from "react";
import { Table, Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "common";
import { Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import PatientSidebar from "../../patientsidebar";
import moment from "moment";

import IMG01 from "../../../assets/images/doctors/doctor-thumb-01.jpg";
import IMG02 from "../../../assets/images/doctors/doctor-thumb-02.jpg";

const TableAppointmentList = () => {
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const appointments = useSelector(
        (state) => state.appointmentdata.appointments
    );
    const user = useSelector(state => state.auth.user);

    const [showModal, setShowModal] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState();

    const history = useHistory();

    const handleChange = (checked, event, id) => {
        dispatch(api.updateAppointment(id, { status: checked }));
    };

    const columns = [
        {
            title: "Specialité",
            dataIndex: "speciality",
            render: (text, record) => <span>{record.speciality.name}</span>,
        },
        {
            title: "Nom Patient",
            dataIndex: "patient",
            render: (text, record) => (
                <h2 className="table-avatar">
                    <a href="/admin/profile" className="avatar avatar-sm mr-2">
                        <img alt="" src={IMG02} />
                    </a>
                    <a href="/admin/profile">
                        {record.patient.firstName} {record.patient.lastName}
                    </a>
                </h2>
            ),
        },
        {
            title: "Date Consultation",
            dataIndex: "date",
        },
        {
            title: "Statut",
            render: (record) => (
                <Switch
                    checked={record?.checked}
                    onChange={(checked, event) =>
                        handleChange(checked, event, record?.id)
                    }
                />
            ),
        },
        {
            title: "Montant",
            dataIndex: "speciality",
            render: (text, record) => <span>{record.speciality.price}</span>,
        },
        {
            title: "Action",
            render: (record) => (
                <button
                    className="btn-primary"
                    onClick={() => {
                        setCurrentAppointment(record);
                        setShowModal(true);
                    }}
                >
                    Informations
                </button>
            ),
        },
    ];

    return (
        <div>
            <Table
                className="table-striped"
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={appointments}
                rowKey={(record) => record.id}
                pagination={false}
            />
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="xl"
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <div className="profile-sidebar">
                                <PatientSidebar patient={currentAppointment?.patient} />
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">
                                        Détails Consultation
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="biller-info">
                                                <h4 className="d-block">
                                                    Dr. {user?.firstName}{" "}
                                                    {user?.lastName}
                                                </h4>
                                                <span className="d-block text-sm text-muted">
                                                    {user?.speciality}
                                                </span>
                                                <span className="d-block text-sm text-muted">
                                                    {user?.city} {user?.country}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-table mb-0">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover table-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Type
                                                                Consultation
                                                            </th>
                                                            <th>Date</th>
                                                            <th>Lieu</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {currentAppointment?.type === "house" ? "Domicile" : "En Ligne"}
                                                            </td>
                                                            <td>
                                                                {moment(currentAppointment?.date).format('LLL')}
                                                            </td>
                                                            <td>
                                                                {currentAppointment?.type === "house" ? currentAppointment?.patient.address : "Appel Vidéo"}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="submit-section">
                                                <button
                                                    onClick={() => history.push(`/admin/chat?patient=${currentAppointment?.patient.id}`)}
                                                    type="submit"
                                                    className="btn btn-primary submit-btn"
                                                    disabled={!moment(
                                                        currentAppointment?.date
                                                    ).isSame(new Date())}
                                                >
                                                    {moment(
                                                        currentAppointment?.date
                                                    ).isSame(new Date()) ? "Commencer" : "Consultation à venir"}

                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                    type="reset"
                                                    className="btn btn-secondary submit-btn"
                                                >
                                                    Fermer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TableAppointmentList;
