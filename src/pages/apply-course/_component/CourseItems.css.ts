import { style } from "@vanilla-extract/css";

export const courseItemsContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: "1.5rem",

	alignItems: "center",
	marginTop: "3rem",

	height: "40rem",
	padding: "1%",

	overflowY: "auto",
});

export const cardClass = style({
	width: "30rem",
	height: "8rem",
	flexShrink: 0,
});

export const cardView = style({
	height: "100%",
});

export const cardContent = style({
	display: "grid",
	height: "100%",
	gridTemplateColumns: "2fr 1fr",
	gridTemplateRows: "1fr 1fr",
});

export const textStyle = style({
	whiteSpace: "pre",
});
