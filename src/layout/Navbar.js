import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { requires } from "../services/api";
import { Context } from "../store/userStore";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { currUser, setCurrUser } = useContext(Context);
  const cookies = new Cookies();

  const handleLogout = async () => {
    const res = await requires.logout();
    if (res.data.message === "ok") {
      setCurrUser(null);
      cookies.remove("currUser");
      cookies.remove("access-token");
      navigate("/form/login");
    }
  };

  return (
    <div className="navbar">
      {currUser ? (
        <div className="navbar-action">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/product"
          >
            List product
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/product-action/add-product"
          >
            Add new product
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/chat"
          >
            Chat room
          </NavLink>
        </div>
      ) : (
        <div className="navbar-action">Dashboard</div>
      )}
      <ul className="navbar-action">
        <li style={{ textTransform: "capitalize" }}>{currUser?.name}</li>
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          {currUser && "Logout"}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
