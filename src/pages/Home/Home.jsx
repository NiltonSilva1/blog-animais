import styles from "./Home.module.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Inicio = () => {
	const [query, setQuery] = useState("");
	const { documents: posts, loading } = useFetchDocuments("posts");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<div className={styles.home}>
			<h1>Veja nossos posts mais recentes</h1>
			<form onSubmit={handleSubmit} className={styles.search_form}>
				<input
					type="text"
					placeholder="Ou busque por tags..."
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="btn">Pesquisar</button>
			</form>
			<div>
				{loading && <p>Carregando...</p>}
				{posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.noposts}>
						<p>Não foram encontrados posts</p>
						<Link to="/post/create" className="btn">
							Criar primeiro post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Inicio;
