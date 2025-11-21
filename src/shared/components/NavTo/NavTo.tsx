import { Navigate } from "react-router";

function NavTo({ to }: { to: string }) {
	const _to = String(to);
	return <Navigate to={_to} />;
}

export default NavTo;
