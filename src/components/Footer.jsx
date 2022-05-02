import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="links">
				<a href="http://https://github.com/NiltonSilva1">GitHub |</a>
				<a href="https://www.linkedin.com/in/nilton-silva-534772236/">
					{" "}
					Linkedin
				</a>
			</div>
			<h3>Conte-nos uma história sobre seu pet!</h3>
			<p>Mini Blog - Meus Pets &copy; 2022</p>
		</footer>
	);
};

export default Footer;
