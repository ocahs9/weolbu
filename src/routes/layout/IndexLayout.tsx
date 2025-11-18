import Header from "@shared/components/Header";
import React from "react";
import { Outlet } from "react-router";

function IndexLayout() {
	return (
		<>
			<Header title="인덱스" onClickLeft={() => {}} onClickRight={() => {}} />
			<Outlet />
		</>
	);
}

export default IndexLayout;
