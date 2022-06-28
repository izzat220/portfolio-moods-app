import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Posts from "./pages/Posts";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Landing />} />
				<Route path="/posts" element={<Posts />} />
			</Route>
		</Routes>
	);
}

export default App;
