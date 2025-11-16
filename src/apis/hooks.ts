import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import * as apis from "./apis";
import * as queryKeys from "./queryKeys";

export const useGetHospitalDetail = (id: number) => {
	return useSuspenseQuery({
		queryKey: queryKeys.GET_HOSPITAL_DETAIL_QUERY_KEY(id),
		queryFn: () => apis.getHospitalDetail(id),
	});
};
