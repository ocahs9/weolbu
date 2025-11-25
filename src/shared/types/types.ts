import type { Course } from "@apis/types";
import type { SortType } from "@pages/apply-course/types";

// 각 정렬 타입에 대한 비교 함수를 정의
const sortFunctions: Record<string, (a: Course, b: Course) => number> = {
	// 최근 등록순 (등록일 기준 내림차순)
	latest: (a, b) =>
		new Date(b.registrationDate).getTime() -
		new Date(a.registrationDate).getTime(),
	// 신청자 많은순 (수강 인원 기준 내림차순)
	"most-applicants": (a, b) => b.numberOfStudents - a.numberOfStudents,
	// 신청률 높은순 (수강 인원/최대 인원 비율 기준 내림차순)
	"highest-acceptance-rate": (a, b) => {
		const ratioA = a.numberOfStudents / a.maxOfStudents;
		const ratioB = b.numberOfStudents / b.maxOfStudents;
		return ratioB - ratioA;
	},
};

// 여러 정렬 조건을 순차적으로 적용하는 함수
export const applySorts = (
	courses: Course[],
	sortTypes: SortType[],
): Course[] => {
	if (sortTypes.length === 0) {
		return courses;
	}

	return [...courses].sort((a, b) => {
		// 각 정렬 조건을 순차적으로 적용
		for (const sortType of sortTypes) {
			const sortFn = sortFunctions[sortType];
			if (sortFn) {
				const result = sortFn(a, b);
				// 현재 정렬 조건에서 차이가 있으면 그 결과를 반환
				if (result !== 0) {
					return result;
				}
			}
		}
		return 0;
	});
};
