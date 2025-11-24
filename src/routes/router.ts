import CourseCreation from "@pages/cource-creation/CourseCreation";
import Index from "@pages/Index";
import Mypage from "@pages/mypage/Mypage";
import SignUp from "@pages/signup/Signup";
import { createBrowserRouter } from "react-router";
import IndexLayout from "./layout/IndexLayout";
import NotFound from "./NotFound";
import { PATH } from "./PATH";

const router = createBrowserRouter([
	{ path: "*", Component: NotFound },
	{
		path: PATH.ROOT,
		Component: IndexLayout,
		children: [{ index: true, Component: Index }],
	},
	{
		path: PATH.SIGNUP,
		Component: SignUp,
	},
	{
		path: PATH.COURSE_CREATION,
		Component: CourseCreation,
	},
	{
		path: PATH.MYPAGE,
		Component: Mypage,
	},
]);

export default router;
