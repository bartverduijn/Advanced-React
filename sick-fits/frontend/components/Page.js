import Header from "./Header";

export default function Page({ children }) {
	return (
		<div>
			<Header />
			<h2>Page component</h2>
			{children}
		</div>
	);
}
