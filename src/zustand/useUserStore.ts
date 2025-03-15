import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

interface IUserState {
	user: any | null;
	setUser: (user: any | null) => void;
}

const useUserStore = create<IUserState>(set => ({
	user: null,
	setUser: user => set({ user }),
}));

// Слушаем изменения состояния аутентификации Firebase
onAuthStateChanged(auth, user => {
	useUserStore.getState().setUser(user); // Обновляем состояние при изменении
});

export default useUserStore;
