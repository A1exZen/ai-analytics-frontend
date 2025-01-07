import "./styles/App.css";
import Header from "./components/ui/Header.tsx";
import { Home } from "./components/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics.tsx";
import {Plans} from "./components/Plans.tsx";

function App() {
	return (
		<BrowserRouter>
			<div className='app font-sans'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/analytics' element={<Analytics />} />
					<Route path='/plans' element={<Plans />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
