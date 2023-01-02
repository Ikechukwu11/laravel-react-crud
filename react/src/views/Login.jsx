import {Link} from "react-router-dom";
import {useRef,useState} from "react";
import axiosClient from "../axios";
import {useStateContext} from "../components/contexts/ContextProvider.jsx";

export default function Login(){
	const emailRef = useRef();
	const passwordRef = useRef();	
	const [errors, setErrors] = useState({});
	const {setUser,setToken} = useStateContext();

	const onSubmit = async(ev)=>{
		ev.preventDefault();
		const error = {};
		const payload = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		}

		console.log(payload);
		
		await axiosClient.post("/login", payload)
			.then(({data})=>{

				console.log(data);
				if (!data.errorState) {
					error.message=data.message;
					error.type='alert-success';

					setErrors(error);

					setTimeout(() => {
					setUser(data.user)
					setToken(data.token)
				
				}, 500);
				} else {
					error.message=data.message;
					error.type='alert-danger';

					setErrors(error);
				}
			})
			.catch(err =>{
				const response = err.response;
				console.log(response.status);
				if(response && response.status===422){
				//console.log(response.data.errors);
				error.email = response.data.errors.email;
				error.password = response.data.errors.password;
				setErrors(error);
			}
				//if(response && response.status===422){
				console.log(response.data.errors);
			//}
		})
	}
	return (
		<form onSubmit={onSubmit}>
			{errors.message && (
        <div className={errors.type}>{errors.message}</div>
       )}
			<h1 className="title">
				Login to your account
			</h1>
			<input ref={emailRef} type="email" placeholder= "Email" />
			{errors.email && (
        <div className="alert-text">{errors.email}</div>
       )}
			<input ref={passwordRef} type="password" placeholder= "Password" />
			{errors.password && (
        <div className="alert-text">{errors.password}</div>
       )}
			<button className="btn btn-block">Login</button>
			<p className="message">
				Not Registered? <Link to="/register">Create an account</Link>
			</p>
		</form>
	)
}