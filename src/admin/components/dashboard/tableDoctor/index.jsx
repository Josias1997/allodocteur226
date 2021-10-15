import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import IMG01 from '../../../assets/images/doctors/doctor-thumb-01.jpg';

const TableDoctor = () => {
    const doctors = useSelector(state => state.admin.doctors);

    const columns = [
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
            dataIndex: 'speciality'
        },
        {
            title: 'Notes',
            render: () => (
                  <> 
                <i className="fe fe-star text-warning"></i>
              <i className="fe fe-star text-warning"></i>
              <i className="fe fe-star text-warning"></i>
              <i className="fe fe-star text-warning"></i>
              <i className="fe fe-star-o text-secondary"></i>
                </>
            ),
        },
      ]
    return (
       <div>
            <Table 
                className="table-striped"
                style = {{overflowX : 'auto'}}
                columns={columns}                 
                  // bordered
                dataSource={doctors.slice(0, 3)}
                rowKey={record => record.id}
                pagination={false} 
            />
       </div>  
    );
};

export default TableDoctor;