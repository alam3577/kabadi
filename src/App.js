import "./App.css";
import Nav from "components/layouts/Nav";
import { Fragment, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routers from "Routers";
import SideBar from "components/ui/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "components/layouts/Footer";
import AdminNav from "components/layouts/AdminNav";
import UIContext from "store/ui/UiContext";
import Contact from "components/layouts/Contact";
import Spinner from "components/ui/Spinner";
import AdminSideBar from "components/ui/AdminSideBar";
import { isAuthenticated, isUser } from "utils/helper";
import ContactMe from "components/layouts/ContactMe";
import SuperAdminSideBar from "components/ui/SuperAdminBar";

function App() {
  const { spinner } = useContext(UIContext);
  const { role } = isUser() || {};
  return (
    <Fragment>
      <div className="app-container" >
      { !['admin', 'super-admin'].includes(role) &&
        <>
          <Nav />
          <SideBar />
          <Routers />
          <Contact /> 
          <ContactMe />
        </>}
      {isAuthenticated() && role === 'super-admin' &&  (
        <>
          <AdminNav />
          <SuperAdminSideBar />
          <Routers />
        </>
      )}
      {isAuthenticated() && role === 'admin' &&  (
        <>
          <AdminNav />
          <AdminSideBar />
          <Routers />
        </>
      )}
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {spinner && (
        <Spinner />
      )}
    </Fragment>
  );
}

export default App;
