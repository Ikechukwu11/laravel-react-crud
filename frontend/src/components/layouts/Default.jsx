import {Outlet,Navigate,Link} from 'react-router-dom';
import {useEffect} from 'react';
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../../axios";

export default function Default(){
	const {user,token,setUser,setToken}=useStateContext();

	if (!token) {
		return <Navigate to="/login" />
	}
	
	const onLogout = (ev)=>{
		ev.preventDefault();

		axiosClient.post('/logout')
		.then(({data}) =>{
			setUser({})
			setToken(null)
		})
	}
 
	useEffect( () =>{
		axiosClient.get('/user')
		.then(({data}) =>{
			setUser(data)
		})
	},[])
	return (
		<div id="defaultLayout">
			<aside>
				 <Link to="/dashboard">Dashboard</Link>
				 <Link to="/users">Users</Link>
			</aside>
			<div className="content">
				<header>
					<div>
						Header
					</div>
					<div>
						{user.name}
						<a href="#" onClick={onLogout} className="btn-logout">Logout</a>
					</div>
				</header>
				<main>
					<Outlet/>
 				</main>
			</div>
			
		</div>
	)
}