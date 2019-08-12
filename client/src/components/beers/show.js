import React, { useState, useEffect } from "react";
import Axios from "axios";

function Show(props) {
  const [ beer, setBlog] = useState([]);

  useEffect(() => {
    Axios.get(`/api/ beers/${props.match.params.id}`)
      .then(result => setBlog(result.data))
      .catch(err => console.error(err));
  }, [props]);

  return (
    <div className="container">
      <header>
        <h1>{ beer.title}</h1>
      </header>

      <div>{ beer.content}</div>
    </div>
  );
}

export default Show;
