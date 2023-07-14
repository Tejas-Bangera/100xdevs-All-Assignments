import { useCallback, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import validateJWT from "../validateJWT";
import Loading from "./Loading";
import GlobalContext from "../context/GlobalContext";

const ProtectedRoutes = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [isAuth, setIsAuth] = useState(false);
  let { setLoggedIn, setUsername } = useContext(GlobalContext);

  const memoValidateJWT = useCallback(validateJWT, []);

  useEffect(() => {
    setIsLoading(true);
    async function callValidateJWT() {
      return await memoValidateJWT();
    }

    callValidateJWT()
      .then((response) => {
        setIsAuth(true);
        setLoggedIn(true);
        setUsername(response.data.username);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((error) => {
        console.log(error);
        setIsAuth(false);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoutes;
