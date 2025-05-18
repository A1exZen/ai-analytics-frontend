import {Navigate, Outlet} from "react-router-dom";
import useUserStore from "../zustand/useUserStore";

const ProtectedRoute = () => {
	const {user} = useUserStore();

	if (!user) {
		return <Navigate to="/" replace/>;
	}

	return <Outlet/>;
};

export default ProtectedRoute;