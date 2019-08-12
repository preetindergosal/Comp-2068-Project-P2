import React, { useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

function Logout() {
  useEffect(() => {
    Axios.post("/api/logout");
  }, []);

  return <Redirect to="/" />;
}

export default Logout;
