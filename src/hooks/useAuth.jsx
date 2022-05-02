import { db } from "../firebase/config";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuth = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	//clean
	//deal with memory leaks
	const [cacelled, setCancelled] = useState(false);

	const auth = getAuth();

	function checkIfCancelled() {
		if (cacelled) {
			return;
		}
	}

	//Register
	const createUser = async (data) => {
		checkIfCancelled();
		setLoading(true);
		setError(null);

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);

			await updateProfile(user, {
				displayName: data.displayName,
			});

			setLoading(false);

			return user;
		} catch (error) {
			console.log(error.message);
			console.log(typeof error.message);

			let systemErrorMessage;

			if (error.message.includes("Password")) {
				systemErrorMessage = "A senha precisa conter ao menos 6 caracteres.";
			} else if (error.message.includes("email-already")) {
				systemErrorMessage = "Email já cadastrado!";
			} else {
				systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
			}

			console.log(systemErrorMessage);
			setError(systemErrorMessage);
		}
	};

	//logout
	const logout = () => {
		checkIfCancelled();
		signOut(auth);
	};

	//login - signIn
	const login = async (data) => {
		checkIfCancelled();
		setLoading(true);
		setError(true);

		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			setLoading(false);
		} catch (error) {
			let systemErrorMessage;

			if (error.message.includes("user-not-found")) {
				systemErrorMessage = "Usuário ou senha inválidos";
			} else if (error.message.includes("wrong-password")) {
				systemErrorMessage = "Usuário ou senha inválidos";
			} else {
				systemErrorMessage = "Ocorreu um erro, tente mais tarde.";
			}

			setError(systemErrorMessage);
			setLoading(false);
		}
	};

	useEffect(() => {
		return () => setCancelled(true);
	}, []);

	return {
		auth,
		createUser,
		error,
		loading,
		logout,
		login,
	};
};
