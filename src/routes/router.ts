import Detail from "@pages/main/detail/Detail";
import Main from "@pages/main/Main";
import Mypage from "@pages/mypage/Mypage";
import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout/MainLayout";
import NotFound from "./NotFound";
import { PATH } from "./PATH";

const router = createBrowserRouter([
	{ path: "*", Component: NotFound },
	{
		path: PATH.MAIN,
		Component: MainLayout,
		children: [
			{
				index: true,
				Component: Main,
			},
			{
				path: PATH.MAIN.DETAIL,
				Component: Detail,
			},
		],
	},
	{
		path: PATH.MYPAGE,
		Component: Mypage,
	},
]);

export default router;
