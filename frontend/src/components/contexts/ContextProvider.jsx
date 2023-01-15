import React,{createContext,useContext,useState} from "react";
const StateContext = createContext({
	user:null,
	token:null,
	notification:null,
	setUser:()=>{},
	setToken:()=>{},
	setNotification:()=>{}	

})

export const ContextProvider = ({children})=>{
	const [user,setUser] = useState({
	});
	const [notification, _setNotification] = useState({});
	const [token,_setToken] = useState(
		localStorage.getItem("ACCESS_TOKEN")
		// 123
		);
	const setNotification=(message,type)=>{
		_setNotification(message,type);

		setTimeout(()=>{
			_setNotification('');
		}, 500)
	}
	const setToken = (token)=>{
		_setToken(token)

		if (token) {
			localStorage.setItem("ACCESS_TOKEN", token);
		} else {
			localStorage.removeItem("ACCESS_TOKEN"); 
		}
	}

	return(
		
		<StateContext.Provider value={{
			user,
			token,
			setUser,
			setToken,
			notification,
			setNotification
		}}>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext); 