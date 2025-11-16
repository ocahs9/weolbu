/*
    과제 시에는 세팅할 시간 부족으로 실제 사용할 일이 거의 적음.
*/
import { createGlobalTheme, style } from "@vanilla-extract/css";

//색상
export const color = createGlobalTheme(":root", {
	primary: {
		blue100: "#DEFEFF",
		blue200: "#C8FDFF",
		blue300: "#B0FCFF",
		blue400: "#8EF6FF",
		blue500: "#43D6FF",
		blue600: "#3DC4F5",
		blue700: "#14B5F0",
		blue800: "#00ACEA",
		blue900: "#00ACEA",
	},
	yellow: {
		yellow100: "#FFFCF2",
		yellow200: "#FFFBEB",
		yellow300: "#FFF5D1",
		yellow400: "#FFF0B8",
		yellow500: "#FFEA9E",
		yellow600: "#FFE785",
		yellow700: "#FFE270",
		yellow800: "#FFDC51",
		yellow900: "#FFD22D",
	},
	gray: {
		gray000: "#FFFFFF",
		gray100: "#F8F8F8",
		gray200: "#F0F0F0",
		gray300: "#E4E4E4",
		gray400: "#D8D8D8",
		gray500: "#C6C6C6",
		gray600: "#BEBEBE",
		gray700: "#717171",
		gray800: "#555555",
		gray900: "#222222",
	},
	red: {
		warning_red100: "#FDE9F4",
		warning_red200: "#F53D3D",
		point_red: "#FF654A",
	},
});

//시멘틱
export const semanticColor = createGlobalTheme(":root", {
	primary: {
		normal: color.primary.blue500,
		strong: color.primary.blue600,
		heavy: color.primary.blue700,
	},
	neutral: {
		normal: color.gray.gray000,
		strong: color.gray.gray100,
		inverse: color.gray.gray900,
		assistive: "#DBD7C6",
	},
	disable: {
		fill: color.gray.gray300,
		text: color.gray.gray500,
	},
	text: {
		normal: color.gray.gray900,
		strong: color.primary.blue500,
		inverse: color.gray.gray000,
		assistive: color.gray.gray700,
		assistiveLight: color.gray.gray600,
		heavy: color.primary.blue700,
	},
	line: {
		normal: color.gray.gray100,
		strong: color.gray.gray200,
		heavy: color.gray.gray300,
	},
	accent: {
		warning: color.red.warning_red200,
	},
});

//폰트

const createFontStyle = ({
	fontSize,
	fontWeight,
	lineHeight,
	letterSpacing,
	fontFamily,
}: {
	fontSize: string;
	fontWeight: string;
	lineHeight: string;
	letterSpacing: string;
	fontFamily: string;
}) =>
	style({
		fontSize,
		fontWeight,
		lineHeight,
		letterSpacing,
		fontFamily,
	});

export const font = {
	display01: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "7.2rem",
		fontWeight: "600",
		lineHeight: "120%",
		letterSpacing: "-0.168rem",
	}),
	title01: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "3.6rem",
		fontWeight: "600",
		lineHeight: "120%",
		letterSpacing: "-0.108rem",
	}),
	title02: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "2.8rem",
		fontWeight: "600",
		lineHeight: "120%",
		letterSpacing: "-0.084rem",
	}),
	title03: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "2.4rem",
		fontWeight: "600",
		lineHeight: "120%",
		letterSpacing: "-0.072rem",
	}),
	heading01: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "2rem",
		fontWeight: "600",
		lineHeight: "120%",
		letterSpacing: "-0.06rem",
	}),
	heading02: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "1.8rem",
		fontWeight: "600",
		lineHeight: "140%",
		letterSpacing: "-0.018rem",
	}),
	heading03: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "1.6rem",
		fontWeight: "600",
		lineHeight: "140%",
		letterSpacing: "-0.016rem",
	}),
	body01: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "1.4rem",
		fontWeight: "600",
		lineHeight: "140%",
		letterSpacing: "-0.028rem",
	}),
	label01: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "1.2rem",
		fontWeight: "600",
		lineHeight: "140%",
		letterSpacing: "-0.024rem",
	}),
	caption01: createFontStyle({
		fontFamily: "Pretendard",
		fontSize: "1rem",
		fontWeight: "600",
		lineHeight: "140%",
		letterSpacing: "-0.02rem",
	}),
};

// ===== Spacing 토큰 =====
export const spacing = createGlobalTheme(":root", {
	xs: "4px",
	sm: "8px",
	md: "16px",
	lg: "24px",
	xl: "32px",
	xxl: "40px",
	xxxl: "100px",
});

// ===== 반응형 브레이크포인트 =====
export const breakpoint = {
	mobile: 375,
	tablet: 500,
	small: 600,
	small2: 800,
	medium: 1080,
	desktop: 1200,
	big: 1360,
	wide: 1500,
	large: 1650,
} as const;

export const mediaQuery = {
	mobile: `screen and (max-width: ${breakpoint.tablet - 1}px)`,
	tablet: `screen and (max-width: ${breakpoint.tablet}px)`,
	small: `screen and (max-width: ${breakpoint.small}px)`,
	small2: `screen and (max-width: ${breakpoint.small2}px)`,
	medium: `screen and (max-width: ${breakpoint.medium}px)`,
	desktop: `screen and (max-width: ${breakpoint.desktop}px)`,
	big: `screen and (max-width: ${breakpoint.big}px)`,
	wide: `screen and (max-width: ${breakpoint.wide}px)`,
	large: `screen and (max-width: ${breakpoint.large}px)`,
} as const;

export const layout = createGlobalTheme(":root", {
	maxWidth: "1390px",
	minWidth: "1200px",
	contentWidth: "1200px",
	padding: {
		container: "40px",
		default: "20px",
	},
	header: {
		height: "80px",
	},
});
