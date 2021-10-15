import React, { useState, useContext } from 'react';
import { Table, Switch } from 'antd';
import  { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FirebaseContext } from 'common';

import IMG01 from '../../../assets/images/doctors/doctor-thumb-01.jpg';
import IMG02 from '../../../assets/images/doctors/doctor-thumb-02.jpg';

const TableAppointmentList = () => {
    const { api } = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const appointments = useSelector(state => state.appointmentdata.appointments);
    const doctors = useSelector(state => state.admin.doctors);
    const [show, setShow] = useState(false);
    const [currentAppointmentId, setCurrentAppointmentId] = useState();

    const columns = [
        {
            title: 'Docteur',
            dataIndex: 'doctor',
            render: (text, record) => (  
                record.doctor ? <h2 className="table-avatar">
                  <a href="/admin/profile" className="avatar avatar-sm mr-2"><img alt="" src={IMG01} /></a>
                  <a href="/admin/profile">{record.doctor?.name}</a>
                </h2> : <button onClick={() => {
                    setShow(true);
                    setCurrentAppointmentId(record.id);
                }} className="btn btn-sm btn-primary">Affecter</button>
            ), 
        },
        {
            title: 'Specialité',
            dataIndex: 'speciality',
            render: (text, record) => (            
                <span>{record.speciality.name}</span>
            ),
        },
        {
            title: 'Nom Patient',
            dataIndex: 'patient',
            render: (text, record) => (            
                <h2 className="table-avatar">
                  <a href="/admin/profile" className="avatar avatar-sm mr-2"><img alt="" src={IMG02} /></a>
                  <a href="/admin/profile">{record.patient.firstName} {record.patient.lastName}</a>
                </h2>
            ), 
        },
        {
            title: 'Date Consultation',
            dataIndex: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (e) => (< Switch/>)
        },
        {
            title: 'Montant',
            dataIndex: 'speciality',
            render: (text, record) => (            
                <span>{record.speciality.price}</span>  
            ), 
        }
    ];
    const doctorColumns = [
        {
            title: 'Nom Docteur',
            dataIndex: 'name',
            render: (text, record) => (            
                <h2 className="table-avatar">
                  <a href="/admin/profile" className="avatar avatar-sm mr-2"><img alt="" src={IMG01} /></a>
                  <a href="/admin/profile">{text}</a>
                </h2>
            ), 
        },
        {
            title: 'Specialité',
            dataIndex: 'speciality',
            render: (text, record) => <span>{record.speciality}</span>
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <button onClick={() => {
                    dispatch(api.updateAppointment(currentAppointmentId, {
                        doctor: record
                    }));
                    setShow(false);
                }} className="btn btn-primary btn-sm">Choisir</button>
            ),
        },
      ]
    return (
       <div>
            <Table className="table-striped"
                style = {{overflowX : 'auto'}}
                columns={columns}                 
                // bordered
                dataSource={appointments}
                rowKey={record => record.id}
                pagination={false} 
            />
            <Modal 
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="custom-modal">
                        Liste Docteurs
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className="table-striped"
                        style = {{overflowX : 'auto'}}
                        columns={doctorColumns}                 
                        // bordered
                        dataSource={doctors}
                        rowKey={record => record.id}
                        pagination={false} 
                    />
                </Modal.Body>
            </Modal>
       </div>
      
    )
};

export default TableAppointmentList;