import {
	useGetMemberInfo,
	useGetMyInfo,
	usePostApplyCourse,
} from "@apis/hooks";
import type { Course } from "@apis/types";
import { PATH } from "@routes/PATH";
import Header from "@shared/components/Header/Header";
import Loading from "@shared/components/Loading/Loading";
import ProtectedPage from "@shared/components/ProtectedRouteCreationPage";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Text } from "reshaped";
import CourseItems from "./_component/CourseItems";
import SortBox from "./_component/SortBox";
import * as styles from "./ApplyCourse.css";
import type { SortType } from "./types";

function ApplyCourse() {
	const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
	const [selectedSorts, setSelectedSorts] = useState<SortType[]>([]);

	const { data: myinfo } = useGetMyInfo();
	const { mutateAsync: applyCourse } = usePostApplyCourse();
	const navigate = useNavigate();

	const handleSelectCourse = (course: Course) => {
		setSelectedCourses((prev) => {
			if (prev.includes(course)) {
				return prev.filter((c) => c.courseId !== course.courseId);
			}
			return [...prev, course];
		});
	};

	const handleSortChange = (value: string | undefined) => {
		if (value) {
			setSelectedSorts((prev) => {
				if (prev.includes(value)) {
					return prev.filter((v) => v !== value);
				}
				return [...prev, value];
			});
		}
	};

	const handleCreateCourse = () => {
		navigate(PATH.COURSE_CREATION.ROOT);
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
			<SortBox
				sortItems={[
					{ label: "최근 등록순", value: "latest" },
					{ label: "신청자 많은순", value: "most-applicants" },
					{ label: "신청률 높은순", value: "highest-acceptance-rate" },
				]}
				handleSortChange={handleSortChange}
			/>
			<Suspense
				fallback={
					<Loading color={"primary"} size={"large"} marginTop={"2rem"} />
				}
			>
				<CourseItems
					handleSelectCourse={handleSelectCourse}
					selectedCourses={selectedCourses}
					selectedSorts={selectedSorts}
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

			{myinfo.memberType === "tutor" && (
				<motion.div
					animate={{
						y: [0, -5, 0],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className={styles.addCourseBtnWrapper}
				>
					<Button
						color={"critical"}
						variant={"faded"}
						size={"large"}
						onClick={handleCreateCourse}
						className={styles.addCourseBtn}
					>
						<span className={styles.btnText}>
							<Text variant={"featured-2"} className={styles.plusIcon}>
								+
							</Text>
							<Text variant={"featured-2"} className={styles.btnLabel}>
								강의 등록
							</Text>
						</span>
					</Button>
				</motion.div>
			)}
		</Container>
	);
}

export default function ApplyCourseWrapper() {
	return (
		<ProtectedPage>
			<ApplyCourse />
		</ProtectedPage>
	);
}
