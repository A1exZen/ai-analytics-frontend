import { create } from "zustand";
import Cookies from "js-cookie";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {jwtDecode} from "jwt-decode";
import {googleLogin} from "@/api/authApi.ts";

interface IUserState {
	user: { id: string; email: string } | null;
	token: string | null;
	setUser: (user: { id: string; email: string } | null, token?: string) => void;
	logout: () => void;
	checkAuth: () => void;
}

interface DecodedToken {
	userId: string;
	iat: number;
	exp: number;
}

const useUserStore = create<IUserState>((set, get) => ({
	user: null,
	token: Cookies.get("jwt") || null,
	setUser: (user, token) => {
		set({ user, token: token || get().token });
		if (token) {
			Cookies.set("jwt", token, { expires: 1 });
		} else if (!user) {
			Cookies.remove("jwt");
		}
	},
	logout: () => {
		set({ user: null, token: null });
		Cookies.remove("jwt");
		auth.signOut().catch((error) => console.error("Error signing out:", error));
	},
	checkAuth: () => {
		console.log("Checking auth...");
		const token = Cookies.get("jwt");
		if (!token) {
			set({ user: null, token: null });
			return;
		}

		try {
			const decoded = jwtDecode<DecodedToken>(token);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {

				set({ user: null, token: null });
				Cookies.remove("jwt");
				return;
			}
			set({ user: { id: decoded.userId, email: "" }, token });
		} catch (error) {
			console.error("Invalid token:", error);
			set({ user: null, token: null });
			Cookies.remove("jwt");
		}
	},
}));

onAuthStateChanged(auth, async (firebaseUser) => {
	if (firebaseUser) {
		const idToken = await firebaseUser.getIdToken();
		try {
			const { user, token } = await googleLogin(idToken);
			useUserStore.getState().setUser(user, token);
		} catch (error) {
			console.error("Error exchanging token:", error);
			useUserStore.getState().logout();
		}
	} else {
		const token = Cookies.get("jwt");
		if (!token) {
			useUserStore.getState().setUser(null);
		}
	}
});

useUserStore.getState().checkAuth();

export default useUserStore;