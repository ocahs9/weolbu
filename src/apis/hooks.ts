import type { CourseCreationType, SignUpMemberType } from "@apis/types";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import * as apis from "./apis";
import * as queryKeys from "./queryKeys";

export const useInfiniteGetCourses = (queryParams: {
	page?: number;
	limit?: number;
}) => {
	return useInfiniteQuery({
		queryKey: queryKeys.GET_COURSES_QUERY_KEY(),
		initialPageParam: queryParams.page ?? 1,
		queryFn: ({ pageParam }) =>
			apis.getCourses({ page: pageParam, limit: queryParams.limit ?? 10 }),
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasMore) {
				return lastPage.pagination.currentPage + 1;
			}
			return undefined;
		},
	});
};

export const useGetMemberInfo = (id: number) => {
	return useSuspenseQuery({
		queryKey: queryKeys.GET_MEMBER_INFO_QUERY_KEY(id),
		queryFn: () => apis.getMemberInfo(id),
	});
};

export const usePostSignup = () => {
	return useMutation({
		mutationFn: (body: SignUpMemberType) => apis.postMemberSignup(body),
	});
};

export const usePostApplyCourse = (courseId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => apis.postApplyCourse(courseId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.GET_COURSES_QUERY_KEY(),
			});
		},
	});
};

export const usePostCreateCourse = (body: CourseCreationType) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => apis.postCreateCourse(body),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.GET_COURSES_QUERY_KEY(),
			});
		},
	});
};
