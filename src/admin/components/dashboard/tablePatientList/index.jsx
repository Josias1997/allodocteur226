import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import IMG01 from '../../../assets/images/doctors/doctor-thumb-01.jpg';

const TablePatientsList = () => {
    const users = useSelector(state => state.admin.users);

    const columns = [
        {
            title: 'Nom Patient',
            dataIndex: 'firstName',
            render: (text, record) => (            
                <h2 className="table-avatar">
                  <a href="/admin/profile" className="avatar avatar-sm mr-2"><img alt="" src={IMG01} /></a>
                  <a href="/admin/profile">{record.firstName} {record.lastName}</a>
                </h2>
              ), 
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Téléphone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Assurance Maladies',
            dataIndex: 'insurance',
            render: (text, record) => (
                <p>{record.insurance ? record.insurance.number : "0"} Consultations</p>
            )
        },
          
    ]
    return (
       <div>
            <Table 
                className="table-striped"
                style = {{overflowX : 'auto'}}
                columns={columns}                 
                  // bordered
                dataSource={users.slice(0, 3)}
                rowKey={record => record.id}
                pagination={false} 
            />
       </div>
      
    )
};

export default TablePatientsList;