import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Index() {
  const [beers, setBlogs] = useState([]);

  useEffect(() => {
    Axios.get("/api/beers")
      .then(result => setBlogs(result.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>All Beers</h1>
      </header>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {beers.map(beer => (
              <tr key={beer._id}>
                <td>
                  <Link to={`/beers/${beer._id}`}>{beer.title}</Link>
                </td>
                <td>{beer.status}</td>
                <td>
                  {beer.author && beer.author.firstName}{" "}
                  {beer.author && beer.author.lastName}
                </td>
                <td>
                  <Link to={`/beers/${beer._id}/edit`}>edit</Link>|
                  <Link to={`/beers/${beer._id}/destroy`}>delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
