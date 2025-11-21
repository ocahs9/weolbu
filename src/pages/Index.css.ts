import { style } from "@vanilla-extract/css";

export const index = style({
	position: "fixed",
	top: "65px",
	backgroundColor: "red",
	height: "100vh ",
});

//input width에 닿으면 아래로 개행되도록
export const input = style({
	textAlign: "center",
});
