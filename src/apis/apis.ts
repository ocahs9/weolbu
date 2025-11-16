import { del, get, patch, post, put } from ".";
import { API_PATH } from "./API_PATH";
import type * as responseType from "./types";

export const getHospitalDetail = async (id: number) => {
	const res = await get<responseType.HospitalInfo>(
		`${API_PATH.HOSPITALS}/${id}`,
	);
	return res.data.data;
};
