import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import SidebarNav from "../sidebar";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import IMG01 from "../../assets/images/doctors/doctor-thumb-01.jpg";

const Patients = () => {
  const prescriptions = useSelector((state) => state.prescriptiondata.prescriptions);
  const columns = [
    {
      title: "Prescription Id",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Patient Name",
      dataIndex: "firstName",
      render: (text, record) => (
        <h2 className="table-avatar">
          <a href="/admin/profile" className="avatar avatar-sm mr-2">
            <img alt="" src={IMG01} />
          </a>
          <a href="/admin/profile">
            {record.patient.firstName} {record.patient.lastName}
          </a>
        </h2>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Liste des prescriptions</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Tableau de bord</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/admin/prescriptions">Prescriptions</Link>
                  </li>
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
                      dataSource={prescriptions}
                      rowKey={(record) => record.id}
                      showSizeChanger={true}
                      pagination={{
                        total: prescriptions.length,
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
    </>
  );
};

export default Patients;
