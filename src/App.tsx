import ThemeProvider from "@providers/ThemeProvider";
import router from "@routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
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
		<Suspense fallback={<div>fallback</div>}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</Suspense>
	);
}

export default App;
