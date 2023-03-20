import "./App.css";
import Nav from "components/layouts/Nav";
import { useContext } from "react";
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
import { isAuthenticated } from "utils/helper";
import ContactMe from "components/layouts/ContactMe";

function App() {
  const { spinner } = useContext(UIContext);
  return (
    <div>
      {!isAuthenticated() && (
        <>
          <Nav />
          <SideBar />
          <Routers />
          <Contact /> 
          <ContactMe />
        </>
      )}
      {isAuthenticated() && (
        <>
          <AdminNav />
          <AdminSideBar />
          <Routers />
        </>
      )}
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
    </div>
  );
}

export default App;
