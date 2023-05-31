import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../../store/userStore";

const Check = ({children}) => {
  const navigate = useNavigate();
  const { currUser } = useContext(Context);

  useEffect(()=> {
    const checkAdmin = () => {
      if(!currUser) {
        navigate('/form/login', { replace: true })
      }
    };
    checkAdmin();
  }, [currUser])

  return (
    <>
      {children ? children : <Outlet />}
    </>
  )
}

export default Check;