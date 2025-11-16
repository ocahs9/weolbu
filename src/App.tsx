import ThemeProvider from "@providers/ThemeProvider";
import router from "@routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
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
		<ErrorBoundary fallbackRender={() => <div>에러</div>}>
			<Suspense fallback={<div>fallback</div>}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider>
						<RouterProvider router={router} />
					</ThemeProvider>
				</QueryClientProvider>
			</Suspense>
		</ErrorBoundary>
	);
}

export default App;
