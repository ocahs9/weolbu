import { style } from "@vanilla-extract/css";

export const bodyContainer = style({
	// position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "1rem 5rem",
	width: "100%",
	minHeight: "calc(100vh - 6.4rem)",
});

export const btn = style({
	marginTop: "4rem",
	width: "calc(100%)",
	maxWidth: "30rem",
});
