import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import "./assets/font/font.css"

const queryclient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryclient}>
		<App />
	</QueryClientProvider>
)
