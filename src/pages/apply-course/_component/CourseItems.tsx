import { useInfiniteGetCourses } from "@apis/hooks";
import type { Course } from "@apis/types";
import { priceFormatter } from "@shared/utils";
import { useEffect, useMemo, useRef } from "react";
import { Card, Checkbox, Text, View } from "reshaped";
import type { SortType } from "../types";
import * as styles from "./CourseItems.css";

interface CourseItemsProps {
	handleSelectCourse: (course: Course) => void;
	selectedCourses: Course[];
	selectedSorts: SortType[];
}

function CourseItems(props: CourseItemsProps) {
	const { handleSelectCourse, selectedCourses, selectedSorts } = props;

	const { data, fetchNextPage, hasNextPage } = useInfiniteGetCourses({
		page: 1,
		limit: 10,
	});

	// const renderedCourses = useMemo(() => {
	// 	return applySort(
	// 		data?.pages.map((page) => page.courses.map),
	// 		selectedSorts,
	// 	);
	// }, [selectedSorts]);

	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = loadMoreRef.current;
		if (element) {
			observerRef.current = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && hasNextPage) {
							fetchNextPage();
						}
					});
				},
				{ threshold: 0.5 },
			);
			observerRef.current.observe(element);
		}
		return () => observerRef.current?.disconnect();
	}, [hasNextPage, fetchNextPage]);

	return (
		<View className={styles.courseItemsContainer}>
			{data?.pages.map((page) =>
				page.courses.map((course) => (
					<CourseCard
						key={course.courseId}
						courseName={course.title}
						coursePrice={course.price}
						courseTutor={course.tutorName}
						numberOfStudents={course.numberOfStudents}
						maxOfStudents={course.maxOfStudents}
						selected={selectedCourses.some(
							(c) => c.courseId === course.courseId,
						)}
						onClick={() => handleSelectCourse(course)}
					/>
				)),
			)}
			<div ref={loadMoreRef} />
		</View>
	);
}

export default CourseItems;

interface CourseCardProps {
	courseName: string;
	coursePrice: number;
	courseTutor: string;
	numberOfStudents: number;
	maxOfStudents: number;
	selected: boolean;
	onClick: () => void;
}

function CourseCard(props: CourseCardProps) {
	const {
		courseName,
		coursePrice,
		courseTutor,
		numberOfStudents,
		maxOfStudents,
		selected,
		onClick,
	} = props;

	console.log(coursePrice);
	console.log(typeof coursePrice);

	return (
		<Card
			as="label"
			selected={selected}
			className={styles.cardClass}
			onClick={onClick}
		>
			<View gap={3} direction="row" align="center" className={styles.cardView}>
				<Checkbox
					value={courseName}
					checked={selected}
					onChange={onClick}
					name={courseName}
				/>
				<View.Item grow className={styles.cardContent}>
					<Text variant="featured-2" weight="medium">
						{courseName}
					</Text>
					<Text variant="featured-2" weight={"medium"}>
						{`${priceFormatter(coursePrice.toString())}원`}
					</Text>
					<Text variant="body-1" color="neutral-faded">
						{`강사명: ${courseTutor}`}
					</Text>
					<Text
						variant="body-2"
						color="neutral-faded"
						className={styles.textStyle}
					>
						{`수강 인원: ${numberOfStudents} / ${maxOfStudents}`}
					</Text>
				</View.Item>
			</View>
		</Card>
	);
}
