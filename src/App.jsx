import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";

import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";
import EditPost from "./pages/EditPost/EditPost";
import Post from "./pages/Post/Post";

function App() {
	const [user, setUser] = useState(undefined);
	const { auth } = useAuth();

	const loadingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	if (loadingUser) {
		return <p>Carregando...</p>;
	}

	return (
		<AuthProvider value={{ user }}>
			<BrowserRouter>
				<NavBar />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/search" element={<Search />} />
						<Route
							path="/login"
							element={!user ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/register"
							element={!user ? <Register /> : <Navigate to="/" />}
						/>
						<Route
							path="/dashboard"
							element={user ? <Dashboard /> : <Navigate to="/login" />}
						/>
						<Route
							path="/post/create"
							element={user ? <CreatePost /> : <Navigate to="/login" />}
						/>
						<Route
							path="/posts/edit/:id"
							element={user ? <EditPost /> : <Navigate to="/login" />}
						/>
						<Route path="/posts/:id" element={<Post />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
