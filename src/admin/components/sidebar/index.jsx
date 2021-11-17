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
              <li className={pathname.includes('appointments') ?"active" :""}>
                <Link to="/admin/appointments"><i className="fe fe-layout" /> <span>Consultations</span></Link>
              </li>
              <li className={pathname.includes('patients') ?"active" :""}>
                <Link to="/admin/patients"><i className="fe fe-user" /> <span>Patients</span></Link>
              </li>
              <li className={pathname.includes('chat') ?"active" :""}>
                <Link to="/admin/chat"><i className="fe fe-comments" /> <span>Messages</span></Link>
              </li>
              <li className={pathname.includes('prescriptions') ?"active" :""}>
                <Link to="/admin/prescriptions"><i className="fe fe-feed" /> <span>Prescriptions</span></Link>
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
