import { globalStyle } from "@vanilla-extract/css";
import "./reset.css";
export const sizeOfRem = 10;

// ===== HTML 전역 스타일 =====
globalStyle("html", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	touchAction: "manipulation",
	WebkitTouchCallout: "none",
	WebkitUserSelect: "none",
	fontSize: `${sizeOfRem}px`, // 1rem = 10px 기준
});

// ===== Body 전역 스타일 =====
globalStyle("body", {
	margin: 0,
	padding: 0,
	minHeight: "100vh",
	backgroundColor: "white",
	fontFamily: "Pretendard, sans-serif",
	color: "black",
	lineHeight: "1.5", // 기본 라인 높이
	letterSpacing: "-0.05em",
	textRendering: "optimizeLegibility",
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	wordBreak: "break-all",
	overflowY: "scroll",
	scrollbarWidth: "none",
	msOverflowStyle: "none",
});

globalStyle("body", {
	width: "100%",

	//media 쿼리용 예시
	// "@media": {
	// 	"screen and (max-width: 767px)": {
	// 		minWidth: "375px",
	// 		maxWidth: "100%",
	// 	},
	// },
});

// Scrollbar 숨기기
globalStyle("body::-webkit-scrollbar", {
	display: "none",
});
