//noti: 경로는 항상 PATH를 import 해서 사용할 것
export const PATH = {
	ROOT: "/",
	MAIN: definePath("/main", {
		DETAIL: "/detail",
		LIST: "/list",
	}),
	MYPAGE: definePath("/mypage", {}),
} as const;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 직관적인 url 사용 + 중첩 라우팅 구조 + 자동 완성 지원을 위한 유틸함수
type PathType<T extends string> = T extends `/${string}` ? T : `/${T}`;
function definePath<
	Base extends string,
	Children extends Record<string, string>,
>(
	base: Base,
	children: Children,
): Base & {
	readonly [K in keyof Children]: `${PathType<Base>}${PathType<Children[K]>}`;
} {
	const _base = base.startsWith("/") ? base : `/${base}`;
	const mapped = Object.fromEntries(
		Object.entries(children).map(([k, v]) => {
			const child = v.startsWith("/") ? v : `/${v}`;
			return [k, _base + child];
		}),
	) as {
		readonly [K in keyof Children]: `${PathType<Base>}${PathType<Children[K]>}`;
	};

	return Object.assign(_base, mapped) as Base & typeof mapped;
}
