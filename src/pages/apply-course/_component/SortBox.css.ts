import { style } from "@vanilla-extract/css";

export const sortRadioView = style({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	gap: "1rem",

	width: "100%",
	marginTop: "2rem",
});

export const checkboxClass = style({
	vars: {
		"--rs-checkbox-line-height": "2rem ",
	},
});
