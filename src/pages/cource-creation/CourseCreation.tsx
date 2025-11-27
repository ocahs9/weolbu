import { useGetMyInfo, usePostCreateCourse } from "@apis/hooks";
import { PATH } from "@routes/PATH";
import Header from "@shared/components/Header/Header";
import InputController from "@shared/components/InputController/InputController";
import Loading from "@shared/components/Loading/Loading";
import {
	numberFormatter,
	priceFormatter,
	priceUnformatter,
} from "@shared/utils";
import React, { useEffect, useRef } from "react";
import { DollarSign, PenTool, UserPlus } from "react-feather";
import { useNavigate } from "react-router";
import { Button, Container, Text } from "reshaped";
import ProtectedPage from "../../shared/components/ProtectedRouteCreationPage";
import * as styles from "./CourseCreation.css";

function CourseCreation() {
	const courseTitle = useRef("");
	const numberOfStudents = useRef("");
	const price = useRef("");

	const { data: myInfo } = useGetMyInfo();
	const { mutateAsync: createCourse } = usePostCreateCourse();
	const navigate = useNavigate();

	useEffect(() => {
		if (myInfo?.memberType === "tutee") {
			alert("수강생은 강의 등록이 불가능합니다.");
			navigate(PATH.APPLY_COURSE.ROOT);
		}
	}, [myInfo, navigate]);

	const handleSubmit = async () => {
		if (myInfo?.memberType === "tutee") {
			alert("수강생은 강의 등록이 불가능합니다.");
			navigate(PATH.APPLY_COURSE.ROOT);
			return;
		}

		if (!courseTitle.current || !numberOfStudents.current || !price.current) {
			alert("모든 필수 정보를 올바르게 입력해주세요.");
			return;
		}

		await createCourse({
			title: courseTitle.current,
			maxOfStudents: Number(numberOfStudents.current),
			price: Number(priceUnformatter(price.current)),
		});

		alert("강의 등록이 완료되었습니다.");
		navigate(PATH.APPLY_COURSE.ROOT);
	};

	return (
		<>
			<Header title="강의 등록" />
			<Container className={styles.bodyContainer}>
				<InputController label="강의명" valueRef={courseTitle} icon={PenTool} />
				<InputController
					label="수강 인원"
					valueRef={numberOfStudents}
					icon={UserPlus}
					formatter={numberFormatter}
					suffix={"명"}
				/>
				<InputController
					label="가격"
					valueRef={price}
					icon={DollarSign}
					formatter={priceFormatter}
					suffix={"원"}
				/>
				<Button
					className={styles.btn}
					type="submit"
					color={"neutral"}
					variant={"solid"}
					size={"xlarge"}
					onClick={handleSubmit}
				>
					<Text variant={"featured-2"}>강의 등록하기</Text>
				</Button>
			</Container>
		</>
	);
}

export default function CourseCreationWrapper() {
	return (
		<ProtectedPage>
			<CourseCreation />
		</ProtectedPage>
	);
}
