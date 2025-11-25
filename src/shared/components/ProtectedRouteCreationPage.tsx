import { PATH } from "@routes/PATH";
import Loading from "@shared/components/Loading/Loading";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router";
import { Button } from "reshaped";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

//suspenseQuery를 사용하면 pedning, error 상태를 묵인하지 않고 명시적으로 throw 해주므로 반드시 데이터가 필요한 곳에 사용하는 것이 좋다.
function ProtectedPage(props: ProtectedRouteProps) {
	const { children } = props;
	const navigate = useNavigate();
	return (
		<Suspense
			fallback={<Loading color={"primary"} size={"large"} marginTop={"2rem"} />}
		>
			<ErrorBoundary
				fallbackRender={() => (
					<div>
						에러가 발생했습니다. 새로고침, 뒤로가기, 앞으로가기 등으로 url 직접
						입력을 하지 말아주세요.
						<Button onClick={() => navigate(PATH.SIGNUP.ROOT)}>
							첫 페이지로 이동해서 다시 시작
						</Button>
					</div>
				)}
			>
				{children}
			</ErrorBoundary>
		</Suspense>
	);
}

export default ProtectedPage;
