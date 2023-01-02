import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios";
export default function Users(){
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const getUsers = ()=> {
		setLoading(true);
		axiosClient.get("/users")
		.then(({data})=>{
			setUsers(data.data);
			setLoading(false);
				console.log(data.data);
			console.log(users);
		})
		.catch(()=>{
			setLoading(false);
		})
	}

	const onDelete = (u)=>{
		if (!window.confirm("Do you really want to delete this user?")) {
			return;
		}

		axiosClient.delete(`/users/${u.id}`)
		.then(()=>{
			getUsers();
		})
	}

	useEffect(()=>{
		getUsers();
	}, [])
	return (

		<div>
			<div style={{display:'flex',justifyContent:'space-between',aLignItems:'center'}}>
				<h1>Users</h1>
				<Link to="/users/new" className="btn-add">Add New User</Link>
			</div>
			<div className="card animated fadeInDown">
			 	<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Registered</th>
							<th>Actions</th>
						</tr>	
					</thead>
					{loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                <h3>Loading...</h3>
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
					<tbody>
						{users.map(u =>(
							<tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  &nbsp;
                  <button onClick={ev =>onDelete(u)} className="btn-delete">Delete</button>
                </td>
              </tr>
							
						))}
					</tbody>
						}
				</table>
			</div>
		</div>
	)
}