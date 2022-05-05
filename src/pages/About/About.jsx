import styles from "./About.module.css";

const About = () => {
	return (
		<div className={styles.about}>
			<h2>
				Sobre o Mini <span>Blog</span>
				<p>
					Este é um projeto de blog com a finalidade de estudar React e contar
					algumas histórias sobre o seu pet :)
				</p>
				<p>
					Qualquer dúvida ou sugestão favor encaminhar um email para:
					<br />
					<a href="mailto: niltonsilva.code@gmail.com">
						Administração
						<img
							src="https://img.freepik.com/vetores-gratis/logotipo-do-cachorro-chefe_83738-437.jpg?w=826"
							alt="Imagem de cachorro"
						/>
					</a>
				</p>
			</h2>
		</div>
	);
};

export default About;
