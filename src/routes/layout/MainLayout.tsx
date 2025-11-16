import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";

//noti: react-router 자체 제공 에러바운더리 존재. but 직접 설정하고 싶으면 이런 방식으로 세부적으로 래핑
export function MainLayout() {
	return (
		<>
			{/* <Header /> */}
			<ErrorBoundary fallbackRender={() => <div>에러</div>}>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
