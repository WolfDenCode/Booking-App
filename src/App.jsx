import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

import { UserContext } from "./components/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse JSON string from localStorage
    } else {
      setUser(null);
    }
    setLoading(false); // Mark loading as complete
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
