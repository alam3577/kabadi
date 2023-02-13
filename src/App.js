import './App.css';
// import Routers from 'Routers';
import Nav from 'components/layouts/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from 'Routers';

function App() {
  return (
    <div>
      <Nav />
      <Routers />
    </div>
  );
}

export default App;
