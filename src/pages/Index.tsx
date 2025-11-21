import { PATH } from "@routes/PATH";
import NavTo from "@shared/components/NavTo";

//todo: 회원가입 여부 판단하는 로직 + 그 후 리다이렉팅(protectedRoute)
function Index() {
	return <NavTo to={PATH.MAIN} />;
}
export default Index;
