import { useInfiniteGetCourses } from "@apis/hooks";
import { priceFormatter } from "@shared/utils";
import { useEffect, useRef } from "react";
import { Card, Checkbox, Text, useToggle, View } from "reshaped";
import * as styles from "./CourseItems.css";

function CourseItems() {
	const { data, fetchNextPage, hasNextPage } = useInfiniteGetCourses({
		page: 1,
		limit: 10,
	});

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
}

function CourseCard(props: CourseCardProps) {
	const {
		courseName,
		coursePrice,
		courseTutor,
		numberOfStudents,
		maxOfStudents,
	} = props;

	const selected = useToggle(false);

	return (
		<Card as="label" selected={selected.active} className={styles.cardClass}>
			<View gap={3} direction="row" align="center" className={styles.cardView}>
				<Checkbox
					value={courseName}
					checked={selected.active}
					onChange={({ checked }) =>
						checked ? selected.activate() : selected.deactivate()
					}
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
