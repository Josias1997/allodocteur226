import React, { useEffect, useContext, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./client/components/header.jsx";
import Footer from "./client/components/footer.jsx";
import LoginContainer from "./client/components/login/login.jsx";
import Register from "./client/components/register/register.jsx";
import ForgotPassword from "./client/components/forgot-password";
import Home from "./client/components/home/index";

//pages
import VideoCall from "./client/components/pages/videocall";
import ChooseSpeciality from "./client/components/pages/searchdoctor";
import ChoosePackage from "./client/components/patients/choose-package";
import Components from "./client/components/pages/component";
import Calendar from "./client/components/pages/calender";
import Invoice from "./client/components/pages/invoices/invoices";
import InvoiceView from "./client/components/pages/invoices/view";
import PatientChat from "./client/components/patients/chat";
import MyPatient from "./client/components/doctors/mypatient";
import Booking from "./client/components/patients/booking";
import Checkout from "./client/components/patients/checkout";
import BookingSuccess from "./client/components/patients/booking-success";
import Dashboard from "./client/components/patients/dashboard";
import Profile from "./client/components/patients/dashboard/profile";
import Password from "./client/components/patients/dashboard/password";
import PatientProfile from "./client/components/doctors/patientprofile";
import Terms from "./client/components/pages/terms";
import Policy from "./client/components/pages/policy";

import { IMG01 } from "./client/components/patients/chat/img";
//pharmacy

import AppUniversal from "./admin/app-universal";
import BlankPage from "./client/components/pages/blankpage/index.jsx";

import ProtectedRoute from "./ProtectedRoute";

const AppContainer = function (props) {
  const user = useSelector((state) => state.auth.user);
  if (props) {
    const url = props.location.pathname.split("/")[1];

    return (
      <Router>
        {url === "admin" ? (
          <div>
            <Switch>
              <Route path="/admin" component={AppUniversal} />
            </Switch>
          </div>
        ) : (
          <div>
            <Route render={(props) => <Header {...props} />} />
            <Switch>
              <Route path="(/|/home)" exact component={Home} />
              <Route path="/terms" exact component={Terms} />
              <Route path="/privacy-policy" exact component={Policy} />
              <ProtectedRoute
                path="/login"
                isLoggedIn={!(user && user.role !== "admin")}
                component={LoginContainer}
                redirect={"/patient/dashboard"}
                exact
              />
              <ProtectedRoute
                path="/register"
                isLoggedIn={!(user && user.role !== "admin")}
                component={Register}
                redirect={"/patient/dashboard"}
                exact
              />
              <ProtectedRoute
                path="/forgot-password"
                isLoggedIn={!(user && user.role !== "admin")}
                component={ForgotPassword}
                redirect={"/patient/dashboard"}
                exact
              />

              <Route
                path="/patient/choose-speciality/:bookingType"
                exact
                component={ChooseSpeciality}
              />
              <Route
                path="/patient/choose-package"
                exact
                component={ChoosePackage}
              />
              <Route path="/pages/calendar" exact component={Calendar} />
              <Route path="/pages/invoice" exact component={Invoice} />
              <Route path="/pages/invoice-view" exact component={InvoiceView} />
              <Route path="/patient/booking/" exact component={Booking} />
              <ProtectedRoute
                path="/patient/chat"
                isLoggedIn={user && user.role !== "admin"}
                component={PatientChat}
                redirect={"/login?next=/patient/chat"}
                exact
              />
              <ProtectedRoute
                path="/patient/checkout"
                isLoggedIn={user && user.role !== "admin"}
                component={Checkout}
                redirect={"/login?next=/patient/checkout"}
                exact
              />
              <ProtectedRoute
                path="/patient/booking-success"
                isLoggedIn={user && user.role !== "admin"}
                component={BookingSuccess}
                redirect={"/login"}
                exact
              />
              <ProtectedRoute
                path="/patient/dashboard"
                isLoggedIn={user && user.role !== "admin"}
                component={Dashboard}
                redirect={"/login"}
                exact
              />
              <ProtectedRoute
                path="/patient/profile"
                isLoggedIn={user && user.role !== "admin"}
                component={Profile}
                redirect={"/login"}
                exact
              />
              <ProtectedRoute
                path="/chat/call"
                isLoggedIn={user && user.role !== "admin"}
                component={VideoCall}
                redirect={"/login"}
                exact
              />
              <ProtectedRoute
                path="/patient/change-password"
                isLoggedIn={user && user.role !== "admin"}
                component={Checkout}
                redirect={"/login"}
                exact
              />
            </Switch>
            <Route render={(props) => <Footer {...props} />} />
          </div>
        )}
      </Router>
    );
  }
  return null;
};

export default AppContainer;
