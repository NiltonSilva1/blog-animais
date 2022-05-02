import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocuments";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState("");

	const { user } = useAuthValue();
	const { insertDOcument, response } = useInsertDocument("posts");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");

		//validate image url
		try {
			new URL(image);
		} catch (error) {
			setFormError("A imagem precisa de um link válido");
		}

		const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

		if (!title || !image || !tags || !body) {
			setFormError("Por favor, preencha todos os camps!");
		}

		if (formError) {
			return;
		}

		insertDOcument({
			title,
			image,
			body,
			tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		});

		navigate("/");
	};

	return (
		<div className={styles.create_post}>
			<h2>Criar Postagem</h2>
			<p>Escreva sobre seu pet e compartilhe suas experiências!</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Título:</span>
					<input
						type="text"
						name="title"
						required
						placeholder="Pense num bom título..."
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</label>
				<label>
					<span>Link da imagem:</span>
					<input
						type="text"
						alt="Imagem selecionada pelo dono do post"
						name="image"
						required
						placeholder="Insira uma imagem do seu bichinho."
						onChange={(e) => setImage(e.target.value)}
						value={image}
					/>
				</label>
				<label>
					<span>Conteúdo:</span>
					<textarea
						name="body"
						required
						placeholder="Coloque o conteúdo do seu post."
						onChange={(e) => setBody(e.target.value)}
						value={body}
					></textarea>
				</label>
				<label>
					<span>Tags:</span>
					<input
						type="text"
						name="tags"
						required
						placeholder="insira as tags separadas por vírgula."
						onChange={(e) => setTags(e.target.value)}
						value={tags}
					/>
				</label>
				{!response.loading && <button className="btn">Criar post!</button>}
				{response.loading && (
					<button className="btn" disabled>
						Aguarde...
					</button>
				)}
				{response.error && <p className="error">{response.error}</p>}
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default CreatePost;
