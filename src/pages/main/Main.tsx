import { useGetHospitalDetail } from "@apis/hooks";
import React, { useEffect } from "react";

function Main() {
	const { data, isError } = useGetHospitalDetail(1);
	console.log(data, isError);
	return <div>Main</div>;
}

export default Main;
