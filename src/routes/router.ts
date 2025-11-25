import ApplyCourse from "@pages/apply-course/ApplyCourse";
import CourseCreation from "@pages/cource-creation/CourseCreation";
import Index from "@pages/Index";
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
		path: PATH.SIGNUP.ROOT,
		Component: SignUp,
	},
	{
		path: PATH.COURSE_CREATION.ROOT,
		Component: CourseCreation,
	},
	{
		path: PATH.APPLY_COURSE.ROOT,
		Component: ApplyCourse,
	},
]);

export default router;
