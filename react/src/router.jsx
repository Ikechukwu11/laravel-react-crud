import {createBrowserRouter} from 'react-router-dom'
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Users from "./views/Users.jsx";
import UserForm from "./views/UserForm.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import Default from "./components/layouts/Default.jsx";
import Guest from "./components/layouts/Guest.jsx";
const router = createBrowserRouter( 
[

	{
	 path:'/',
	 element:<Default />,
	 children:[
		 	{
				path:'/users',
				element:<Users />
			},
			{
				path:'/users/new',
				element:<UserForm key="userCreate"/>
			},

			{
				path:'/users/:id',
				element:<UserForm key="userUpdate"/>
			},
			{
				path:'/dashboard',
				element:<Dashboard />
			},
	 	]
	},

	{
	 path:'/',
	 element:<Guest />,
	 children:[
		 	{
			 	path:'/login',
		 		element:<Login />
			},

			{
				path:'/register',
				element:<Register />
			},
		]
	},

	{
		path:'*',
		element:<NotFound />
	},
]
)
export default router;