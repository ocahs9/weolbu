import { useGetHospitalDetail } from "@apis/hooks";
import React, { useEffect } from "react";

function Main() {
	const { data } = useGetHospitalDetail(1);
	console.log(data);

	// throw new Error("error");
	// throw new Promise((resolve) => resolve("gi"));
	return <div>Main</div>;
}

export default Main;
