import router from "@routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 5,
			retryDelay: 0,
		},
		mutations: {
			retry: 5,
			retryDelay: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
