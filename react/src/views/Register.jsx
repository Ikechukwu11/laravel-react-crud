import {Link} from "react-router-dom";
import {useRef,useState} from "react";
import axiosClient from "../axios";
import {useStateContext} from "../components/contexts/ContextProvider.jsx";

export default function Register(){
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const [errors, setErrors] = useState({});
	const {setUser,setToken} = useStateContext();

	const onSubmit = (ev)=>{
		ev.preventDefault();
		const error = {};
		const payload = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			password_confirmation: confirmPasswordRef.current.value,
		}

		console.log(payload);
		axiosClient.post("/register", payload)
		.then(({data})=>{
			setUser(data.user)
			setToken(data.token)
		})
		.catch(err =>{
			const response = err.response;
			if(response && response.status===422){
				console.log(response.data.errors);

				error.name = response.data.errors.name;
				error.email = response.data.errors.email;
				error.password = response.data.errors.password;
				setErrors(error);
			}
		})
	}
	return (
		<form onSubmit={onSubmit}>
			<h1 className="title">
				Register for free
			</h1>
			<input ref={nameRef} type="text" placeholder= "Full Name" />
			{errors.name && (
        <div className="alert-text">{errors.name}</div>
       )}
			<input ref={emailRef} type="email" placeholder= "Email Address" />
			{errors.email && (
        <div className="alert-text">{errors.email}</div>
       )}
			<input ref={passwordRef} type="password" placeholder= "Password" />
			{errors.password && (
        <div className="alert-text">{errors.password}</div>
       )}
			<input ref={confirmPasswordRef} type="password" placeholder= "Confirm Password" />
			<button className="btn btn-block">Register</button>
			<p className="message">
				Already Registered? <Link to="/login">Login</Link>
			</p>
		</form>
	)
}