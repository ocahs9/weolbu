import { style } from "@vanilla-extract/css";

export const bodyContainer = style({
	position: "relative",
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

export const addCourseBtnWrapper = style({
	position: "fixed",
	top: "1.5rem",
	right: "40%",
});

export const addCourseBtn = style({
	width: "5rem",
	height: "5rem",
	borderRadius: "50%",
	transition: "all 0.3s ease",
	overflow: "hidden",
	":hover": {
		width: "10rem",
		borderRadius: "2rem",
	},
});

export const btnText = style({
	position: "relative",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
});

export const plusIcon = style({
	position: "absolute",
	transition: "opacity 0.3s ease",
	selectors: {
		[`${addCourseBtn}:hover &`]: {
			opacity: 0,
		},
	},
});

export const btnLabel = style({
	position: "absolute",
	opacity: 0,
	transition: "opacity 0.3s ease",
	whiteSpace: "nowrap",
	selectors: {
		[`${addCourseBtn}:hover &`]: {
			opacity: 1,
		},
	},
});
