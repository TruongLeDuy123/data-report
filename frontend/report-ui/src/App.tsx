import { BrowserRouter, Routes, Route } from "react-router-dom"
import ReportBuilderPage from "./pages/ReportBuilderPage"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ReportBuilderPage />} />
			</Routes>
		</BrowserRouter>
	)
}
