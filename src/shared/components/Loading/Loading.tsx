import { Loader } from "reshaped";

interface LoadingProps {
	color?: string;
	size?: "small" | "medium" | "large";
	ariaLabel?: string;
	marginTop?: string;
}

function Loading(props: LoadingProps) {
	const {
		color = "white",
		size = "medium",
		ariaLabel = "Loading",
		marginTop = "0",
	} = props;

	return (
		<span style={{ color: color, marginTop: marginTop }}>
			<Loader color={"inherit"} size={size} ariaLabel={ariaLabel} />
		</span>
	);
}

export default Loading;
