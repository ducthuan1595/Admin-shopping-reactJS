import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Navbar from './layout/Navbar';
import Form from './container/auth/Form';
import Home from './container/pages/Home';
import ListProduct from './container/pages/ListProduct';
import Chat from './container/pages/Chat';
import ActionProduct from './container/pages/ActionProduct';
import DetailOrder from './container/pages/DetailOrder';
import Check from './container/auth/Check';
import './css/App.css';
import './css/product.css';
import './css/chat.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/form/login' element={<Form />} />
        <Route element={<Check />}>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<ListProduct />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/product-action/:params' element={<ActionProduct />} />
          <Route path='/order/:params' element={<DetailOrder />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
