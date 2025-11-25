import { usePostApplyCourse } from "@apis/hooks";
import type { Course } from "@apis/types";
import Header from "@shared/components/Header/Header";
import Loading from "@shared/components/Loading/Loading";
import { Suspense, useState } from "react";
import { Button, Container, Text } from "reshaped";
import CourseItems from "./_component/CourseItems";
import * as styles from "./ApplyCourse.css";

function ApplyCourse() {
	const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
	const { mutateAsync: applyCourse } = usePostApplyCourse();

	const handleSelectCourse = (course: Course) => {
		setSelectedCourses((prev) => {
			if (prev.includes(course)) {
				return prev.filter((c) => c.courseId !== course.courseId);
			}
			return [...prev, course];
		});
	};

	//만약 실패를 반환하는 경우에는? -> 동기적으로 에러나 프로미스가 throw되면 맛이가지만, 비동기적이라 어플리케이션이 맛가지는 않는다.
	//생각해보면 try-catch 블록을 비동기 처리에 꼭 써야 하나 싶다. alert or 로깅하거나 특수하게 변수에 저장하거나 재시도할게 아니라면..
	const handleApplyCourse = async () => {
		try {
			await Promise.all(
				selectedCourses.map((course) => applyCourse(course.courseId)),
			);
			alert("수강 신청이 완료되었습니다.");
		} catch (error) {
			console.error(error);
			alert("수강 신청에 실패했습니다.");
		}
	};

	return (
		<Container className={styles.bodyContainer}>
			<Header title="강의 목록" />
			<Suspense
				fallback={
					<Loading color={"primary"} size={"large"} marginTop={"2rem"} />
				}
			>
				<CourseItems
					handleSelectCourse={handleSelectCourse}
					selectedCourses={selectedCourses}
				/>
			</Suspense>
			<Button
				className={styles.btn}
				type="submit"
				color={"positive"}
				variant={"solid"}
				size={"xlarge"}
				onClick={handleApplyCourse}
			>
				<Text variant={"featured-2"}>수강 신청하기</Text>
			</Button>
		</Container>
	);
}

export default ApplyCourse;
