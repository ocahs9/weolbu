import arrowLeftIcon from "@assets/png/arrow-left.png";
import editIcon from "@assets/png/edit.png";
import { zIndex } from "@styles/token.css";
import { style } from "@vanilla-extract/css";

export const header = style({
	position: "fixed",
	top: 0,
	zIndex: zIndex.header,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "1.6rem 0",
	width: "100%",
	height: "6.4rem",
	backgroundColor: "white",
	borderBottom: "1px solid #F8F8F8",
});

export const headerIcon = style({
	display: "flex",
	width: "24px",
	height: "24px",
	padding: "2px",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "10px",
	backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
});

export const headerLeftIcon = style([
	headerIcon,
	{
		backgroundImage: `url(${arrowLeftIcon})`,
	},
]);

export const headerRightIcon = style([
	headerIcon,
	{
		backgroundImage: `url(${editIcon})`,
	},
]);

export const headerText = style({
	color: "#222",
	textAlign: "center",
	fontFamily: "Pretendard",
	fontSize: "1.6rem",
	fontWeight: "600",
	lineHeight: "140%",
	letterSpacing: "-0.16px",
});
