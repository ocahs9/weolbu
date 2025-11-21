import { Loader } from "reshaped";

interface LoadingProps {
	color?: string;
	size?: "small" | "medium" | "large";
	ariaLabel?: string;
}

function Loading(props: LoadingProps) {
	const { color = "white", size = "medium", ariaLabel = "Loading" } = props;

	return (
		<span style={{ color: color }}>
			<Loader color={"inherit"} size={size} ariaLabel={ariaLabel} />
		</span>
	);
}

export default Loading;
