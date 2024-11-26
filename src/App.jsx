import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

import { UserContext } from "./components/UserContext";
function App() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
