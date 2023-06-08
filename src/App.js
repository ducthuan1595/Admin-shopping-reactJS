import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Howl } from 'howler';

import Navbar from "./layout/Navbar";
import Form from "./container/auth/Form";
import Home from "./container/pages/Home";
import ListProduct from "./container/pages/ListProduct";
import Chat from "./container/pages/Chat";
import ActionProduct from "./container/pages/ActionProduct";
import DetailOrder from "./container/pages/DetailOrder";
import Check from "./container/auth/Check";
import { socket } from "./socket";
import "./css/App.css";
import "./css/product.css";
import "./css/chat.css";
import { useContext, useEffect } from "react";
import { Context } from "./store/userStore";

const soundUrl = `${process.env.PUBLIC_URL}/audio/aound1.wav`;

const sound = new Howl({
  src: [soundUrl]
});

function App() {

  const { isAudio } = useContext(Context);
  useEffect(() => {
    sound.play();
  }, [isAudio])
  socket.on("event", () => {
    console.log("Connect to server");
  });

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/form/login" element={<Form />} />
        <Route element={<Check />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ListProduct />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/product-action/:params" element={<ActionProduct />} />
          <Route path="/order/:params" element={<DetailOrder />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
