import React, {
	createContext,
	type ReactNode,
	useContext,
	useState,
} from "react";

interface ThemeContextType {
	isDark: boolean;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
	const [isDark, setIsDark] = useState(false);
	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	const value: ThemeContextType = {
		isDark,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within an ThemeProvider");
	}
	return context;
};

export default ThemeProvider;
