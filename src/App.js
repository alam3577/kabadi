import './App.css';
// import Routers from 'Routers';
import Nav from 'components/layouts/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from 'Routers';
import SideBar from 'components/ui/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from 'components/layouts/Contact';
import Footer from 'components/layouts/Footer';

function App() {
  return (
    <div>
      <Nav />
      <SideBar />
      <Routers />
      <Contact />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
