import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

import { Context } from "../../store/userStore";
import { requires } from "../../services/api";

const Form = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const {setCurrUser} = useContext(Context);

  const [isValid, setInvalid] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [valueInput, setValueInput] = useState({
    email: "",
    password: "",
  });

  // target form input
  const handleChangeInput = (e, name) => {
    let stateCopy = { ...valueInput };
    stateCopy[name] = e.target.value;
    setInvalid(false);
    setValueInput(stateCopy);
  };

  // valid input form
  const handleBlur = (name) => {
    if (valueInput[name].trim().length === 0) {
      setInvalid(true);
      setMessageError("Please, this field is require!");
    }
    if(name === 'password' && valueInput['password'].trim().length < 7) {
      setInvalid(true);
      setMessageError('Please, password must at least 8 charts!')
    }
    if (name === "email" && !valueInput["email"].includes("@")) {
      setInvalid(true);
      setMessageError("Please, this field must to be email!");
    }
  };

  const handleSubmitForm = async(e) => {
    e.preventDefault();
    if(!isValid) {
      const res = await requires.login(valueInput.email, valueInput.password);
      if(res.data.message === 'ok') {
        setCurrUser(res.data.user);
        cookie.set('currUser', res.data.user);
        navigate('/');
      }else {
        setMessageError("Please, Invalid value!");
      }
    }
  };

  return (
    <div className="form">
      <div className="p-5"></div>
      <form onSubmit={handleSubmitForm}>
        <h1 className="mb-3 text-center">Login</h1>
        <hr></hr>
        <div className="form-group pb-3">
          <label className="form-label">Email</label>
          <input
            onBlur={handleBlur.bind(null, "email")}
            onChange={(e) =>handleChangeInput(e, "email")}
            type="email"
            name="email"
            className="form-control"
            value={valueInput.email}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Password</label>
          <input
            onBlur={handleBlur.bind(null, "password")}
            onChange={(e)=>handleChangeInput(e, "password")}
            type="password"
            name="password"
            className="form-control"
            value={valueInput.password}
          />
        </div>
        <div className='err-message'>{messageError}</div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
