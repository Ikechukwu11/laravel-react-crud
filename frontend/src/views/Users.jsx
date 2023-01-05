import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [perpage, setPerPage] = useState(0);

  const getUsers = async () => {
    setLoading(true);
    axiosClient
      .get(`/users?page=${page}`)
      .then(({ data }) => {
        setUsers(data.data);
        setTotalPages(data.meta.last_page);
        setPage(data.meta.current_page);
        setPerPage(data.meta.per_page);
        // Set the page number after the data is fetched

        // Initialize the page numbers array
        let pageNumbers = [];
        for (let i = 1; i <= data.meta.last_page; i++) {
          pageNumbers.push(i);
        }
        setPageNumbers(pageNumbers);

        setLoading(false);

        console.log(data.data);
        console.log(users);
        console.log(data.meta.last_page);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDelete = (u) => {
    if (!window.confirm("Do you really want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/users/${u.id}`).then(() => {
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, [page]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          aLignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">
          Add New User
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  <h3>Loading...</h3>
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1 + (page - 1) * perpage}</td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={"/users/" + u.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      onClick={(ev) => onDelete(u)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <br />
        <div style={{ textAlign: "center" }}>
          <p>
            <small>
              Showing page {page} of {totalPages}{" "}
              {totalPages > 1 ? "records" : "record"}
            </small>
          </p>
          <button
            className="btn btn-paginate"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          {/*pageNumbers.map((number) => (
            <button
              key={number}
              className={`btn btn-paginate ${number === page ? "active" : ""}`}
              onClick={() => setPage(number)}
              disabled={number === page}
            >
              {number}
            </button>
          ))*/}
          
          {/* Only show the first, current, and last page numbers */}
  
      
      {page > 3 && (
  <button
    key={1}
    onClick={() => setPage(1)}
    className={`btn btn-paginate ${1 === page ? 'active' : ''}`}
  >
    1
  </button>
)}
{page > 4 && <span>...</span>}
{pageNumbers.filter(number => Math.abs(number - page) < 2).map(number => (
  <button
    key={number}
    onClick={() => setPage(number)}
    className={`btn btn-paginate ${number === page ? 'active' : ''}`}
  >
    {number}
  </button>
))}
{page < totalPages - 3 && <span>...</span>}
{page < totalPages - 2 && (
  <button
    key={totalPages}
    onClick={() => setPage(totalPages)}
    className={`btn btn-paginate ${totalPages === page ? 'active' : ''}`}
  >
    {totalPages}
  </button>
)}
        
          <button
            className="btn btn-paginate"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}>
          
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
