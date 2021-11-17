import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from 'common';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import SidebarNav from "../sidebar";
import PatientSidebar from "../patientsidebar";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import IMG01 from "../../assets/images/doctors/doctor-thumb-01.jpg";

const Patients = () => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const users = useSelector((state) =>
    state.admin.users.filter((user) => user.role !== "admin")
  );
  const user = useSelector((state) => state.auth.user);
  const addingPrescription = useSelector(state => state.prescriptiondata.loading);
  const prescriptionError = useSelector(state => state.prescriptiondata.error);
  const addingMedicalRecord = useSelector(state => state.medicalRecorddata.loading);
  const medicalRecordError = useSelector(state => state.medicalRecorddata.error);

  const [showModal, setShowModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState();
  const [type, setType] = useState("medical-record");
  const [file, setFile] = useState();

  const columns = [
    {
      title: "Patient Id",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Nom Patient",
      dataIndex: "firstName",
      render: (text, record) => (
        <h2 className="table-avatar">
          <a href="/admin/profile" className="avatar avatar-sm mr-2">
            <img alt="" src={IMG01} />
          </a>
          <a href="/admin/profile">
            {record.firstName} {record.lastName}
          </a>
        </h2>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Téléphone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Assurance Maladies",
      dataIndex: "insurance",
      render: (text, record) => (
        <p>{record.insurance ? record.insurance.number : "0"} Consultations</p>
      ),
    },
    {
      title: "Actions",
      render: (record) => (
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            setCurrentPatient(record);
            setShowModal(true);
          }}
        >
          Prescription
        </button>
      ),
    },
  ];

  const sendFile = () => {
    if (!file) {
      return alert("Document non présent");
    }
    if (type === "medical-record") {
      dispatch(api.createMedicalRecord({
        patient: currentPatient, file
      }));
    } else {
      dispatch(api.createPrescription({
        patient: currentPatient, file
      }))
    }
  }

  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">List of Patient</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#0">Users</Link>
                  </li>
                  <li className="breadcrumb-item active">Patient</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      className="table-striped"
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      // bordered
                      dataSource={users}
                      rowKey={(record) => record.id}
                      showSizeChanger={true}
                      pagination={{
                        total: users.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <PatientSidebar patient={currentPatient} />
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Envoyer document</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="biller-info">
                        <h4 className="d-block">
                          Dr. {user?.firstName} {user?.lastName}
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
                  {prescriptionError && <div>{prescriptionError.message}</div>}
                  {medicalRecordError && <div>{medicalRecordError.message}</div>}
                  <div className="form-group">
                    <label>Type Document</label>
                    <select className="form-control" onChange={event => setType(event.target.value)}>
                      <option value="medical-record">Examen Médical</option>
                      <option value="prescription">Prescription / Ordonnance</option>
                    </select>
                  </div>
                  <div className="form-group mb-0" onChange={event => setFile(event.target.files[0])}>
                      <label>Fichier</label>
                      <input type="file" className="form-control" />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="submit-section">
                      {(addingPrescription || addingMedicalRecord) ?  <button className="btn btn-primary submit-btn" disabled>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Chargement...
                      </button> :  <button
                          onClick={sendFile}
                          type="submit"
                          className="btn btn-primary submit-btn"
                        >
                          Envoyer
                        </button>}
                        <button
                          onClick={() => setFile(null)}
                          type="reset"
                          className="btn btn-secondary submit-btn"
                        >
                          Annuler
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
    </>
  );
};

export default Patients;
