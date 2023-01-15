import {Link,useParams,useNavigate} from "react-router-dom";
import {useRef,useState,useEffect} from "react";
import axiosClient from "../axios";
import {useStateContext} from "../components/contexts/ContextProvider.jsx";

export default function UserForm(){

	const {id}= useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		id:id,
		name:'',
		email:'',
		password:'',
		password_confirmation:''
	});
	const [loading, setLoading] = useState(false);

	if (id) {
		useEffect(()=>{
			setLoading(true);
			axiosClient.get(`/users/${id}`)
			.then(({data})=>{
				setUser(data);
				setLoading(false);
			})
			.catch(()=>{
				setLoading(false);
			})
		},[])
	}
	const [errors, setErrors] = useState({});
	const {setNotification} = useStateContext();
	const onSubmit = (ev)=>{
		ev.preventDefault();
		const error = {};
		let notificationData = '';
		//console.log(user);

		//update existing user
		if (user.id) {
			axiosClient.put(`/users/${user.id}`, user)
			.then(({data})=>{
				//console.log(data);
				error.message= 'User updated successfully';
				error.type='alert-success';
				setErrors(error);
				notificationData = {
					message:error.message,
					type:'notification-success'
				}
				setNotification(notificationData);

				setTimeout(function(){
					navigate("/users")
				}, 700)
			})
			.catch(err =>{
				const response = err.response;
				if(response && response.status===422){
					//console.log(response.data.errors);

					error.name = response.data.errors.name;
					error.email = response.data.errors.email;
					//error.password = response.data.errors.password;
					error.message=response.data.message ? response.data.message : response?.message;
					error.type='alert-danger';
					setErrors(error);
					
					notificationData = {
						message:error.message,
						type:'notification-danger'
					}
					setNotification(notificationData);
				}
			})
		} else {
			axiosClient.post(`/users`,user)
			.then(({data})=>{
				//console.log(data);
				error.message= 'User created successfully';
				error.type='alert-success';
				setErrors(error);
				notificationData = {
						message:error.message,
						type:'notification-success'
					}
				setNotification(notificationData);
				setTimeout(function(){
					navigate("/users")
				}, 700)
			})
			.catch(err =>{
				const response = err.response;
				if(response && response.status===422){
					//console.log(response.data.errors);

					error.name = response.data.errors.name;
					error.email = response.data.errors.email;
					error.password = response.data.errors.password;
					error.message=response.data.message;
					error.type='alert-danger';
					setErrors(error);

					notificationData = {
						message:error.message,
						type:'notification-danger'
					}
					setNotification(notificationData);
				}
			})
		}
		
	}

	return (
		<>
			
				{!user.id && <h1>New User</h1>}
				{user.id && <h1>Update User: {user.name}</h1>}
				
				<div className="card animated fadeInDown">
					{loading && 
						<div className="text-center">
              <h3>Loading...</h3>
            </div>
          }
				 {!loading &&
					<form onSubmit={onSubmit}>
					{errors.message && (
		        <div className={errors.type}>{errors.message}</div>
		       )}
						<input required={!user.id && true} onChange={ev =>{setUser({...user, name:ev.target.value})}} value={user.name} type="text" placeholder= "Full Name" />
						{errors.name && (
		        	<div className="alert-text">{errors.name}</div>
		       	)}
						<input required={!user.id && true} onChange={ev =>{setUser({...user, email:ev.target.value})}} value={user.email} type="email" placeholder= "Email Address" />
						{errors.email && (
		       		<div className="alert-text">{errors.email}</div>
		       	)}
						<input required={!user.id && true} onChange={ev =>{setUser({...user, password:ev.target.value})}} type="password" placeholder= "Password" />
						{errors.password && (
		        	<div className="alert-text">{errors.password}</div>
		       	)}
						<input required={!user.id && true} onChange={ev =>{setUser({...user, password_confirmation:ev.target.value})}} type="password" placeholder= "Confirm Password" />
						<button className="btn">Save</button>
					</form> 
				}
				</div>
		</>
	)
}