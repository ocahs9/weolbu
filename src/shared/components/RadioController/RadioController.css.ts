import { style } from "@vanilla-extract/css";

export const radioControllerContainer = style({
	maxWidth: "60rem !important",
	width: "100%",
	padding: "0",
	marginTop: "2rem",
});

export const radioController = style({
	width: "100%",
	marginTop: "2rem",
});

export const radioControllerLabel = style({
	marginBottom: "1rem",
});

export const radio = style({
	vars: {
		"--rs-radio-line-height": "2rem ",
	},
});
