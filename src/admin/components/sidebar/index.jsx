import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

class SidebarNav extends Component {
    constructor(props){
      super(props);
      this.state={
        show: null
      }
    }

  handleShow(id){
    this.setState({
        show: id
    })
  }

  render() {

    const {  location } = this.props
    let pathname = location.pathname

   return (
    <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className={pathname === '/admin' ?"active" :""}>
                <Link to="/admin"><i className="fe fe-home" /> <span>Tableau de bord</span></Link>
              </li>
              <li className={pathname.includes('appointment-list') ?"active" :""}>
                <Link to="/admin/appointment-list"><i className="fe fe-layout" /> <span>Consultations</span></Link>
              </li>
              <li className={pathname.includes('doctor-list') ?"active" :""}>
                <Link to="/admin/doctor-list"><i className="fe fe-user-plus" /> <span>Docteurs</span></Link>
              </li>
              <li className={pathname.includes('patient-list') ?"active" :""}>
                <Link to="/admin/patient-list"><i className="fe fe-user" /> <span>Patients</span></Link>
              </li>
              <li className={pathname.includes('transactions-list') ?"active" :""}>
                <Link to="/admin/transactions-list"><i className="fe fe-activity" /> <span>Transactions</span></Link>
              </li>
              <li className={pathname.includes('settings') ?"active" :""}>
                <Link to="/admin/settings"><i className="fe fe-vector" /> <span>Paramètres</span></Link>
              </li>
              <li className={pathname.includes('profile') ?"active" :""}>
                <Link to="/admin/profile"><i className="fe fe-user-plus" /> <span>Profil</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}
}

export default withRouter(SidebarNav);
