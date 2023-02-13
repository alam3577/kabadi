import Home from 'pages/Home';
import Pickup from 'pages/Pickup';
import Price from 'pages/Price';
import { Route, Routes } from 'react-router-dom';

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/price" element={<Price />} />
        <Route path="/book-pickup" element={<Pickup />} />
      </Routes>
    </div>
  );
}

export default Routers;
