import './App.css';
// import Routers from 'Routers';
import Nav from 'components/layouts/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from 'Routers';
import SideBar from 'components/ui/SideBar';

function App() {
  return (
    <div>
      <Nav />
      <SideBar />
      <Routers />
    </div>
  );
}

export default App;
