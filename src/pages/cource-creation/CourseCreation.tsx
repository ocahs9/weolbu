import Header from "@shared/components/Header/Header";
import InputController from "@shared/components/InputController/InputController";
import Loading from "@shared/components/Loading/Loading";
import React, { useRef } from "react";
import { DollarSign, PenTool, UserPlus } from "react-feather";
import { Button, Container, Text } from "reshaped";
import * as styles from "./CourseCreation.css";

//todo: 강의 목록에서 넘어오고, 등록 완료 후 다시 강의 목록으로 넘어가는 로직 구현
//todo: 수강생 회원은 등록 불가 -> 수강생인지 여부를 파악하는 로직 필요

function CourseCreation() {
	const courseTitle = useRef("");
	const numberOfStudents = useRef("");
	const price = useRef("");

	const handleSubmit = () => {
		console.log({
			courseTitle: courseTitle.current,
			numberOfStudents: numberOfStudents.current,
			price: price.current,
		});
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
				/>
				<InputController label="가격" valueRef={price} icon={DollarSign} />
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

export default CourseCreation;
