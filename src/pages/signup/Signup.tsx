import Header from "@shared/components/Header/Header";
import InputController from "@shared/components/InputController/InputController";
import Loading from "@shared/components/Loading/Loading";
import RadioController from "@shared/components/RadioController/RadioController";
import { passwordSchema } from "@shared/schema";
import { useRef, useState } from "react";
import { Lock, Mail, Phone, User } from "react-feather";
import { Button, Container, Text } from "reshaped";
import * as styles from "./Signup.css";

function SignUp() {
	const nameValueRef = useRef("");
	const emailValueRef = useRef("");
	const phoneNumberValueRef = useRef("");
	const passwordValueRef = useRef("");
	const genderValueRef = useRef("");

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		if (
			!nameValueRef.current ||
			!emailValueRef.current ||
			!phoneNumberValueRef.current ||
			!passwordValueRef.current ||
			!genderValueRef.current
		) {
			alert("모든 필수 정보를 입력해주세요.");
			return;
		}

		setIsLoading(true);
		console.log({
			nameValueRef,
			emailValueRef,
			phoneNumberValueRef,
			passwordValueRef,
			genderValueRef,
		});
	};

	return (
		<>
			<Header title="회원가입" />
			<Container className={styles.bodyContainer}>
				<InputController label="이름" valueRef={nameValueRef} icon={User} />
				<InputController label="이메일" valueRef={emailValueRef} icon={Mail} />
				<InputController
					label="휴대폰 번호"
					valueRef={phoneNumberValueRef}
					icon={Phone}
				/>
				<InputController
					label="비밀번호"
					valueRef={passwordValueRef}
					schema={passwordSchema}
					password
					icon={Lock}
				/>
				<RadioController
					name="성별"
					radioItems={[
						{ label: "남자", value: "male" },
						{ label: "여자", value: "female" },
					]}
					valueRef={genderValueRef}
				/>
				<Button
					className={styles.btn}
					type="submit"
					color={"primary"}
					variant={"solid"}
					size={"xlarge"}
					onClick={handleSubmit}
				>
					{isLoading ? (
						<Loading color="white" size="medium" ariaLabel="Loading" />
					) : (
						<Text variant={"featured-2"}>회원가입</Text>
					)}
				</Button>
			</Container>
		</>
	);
}

export default SignUp;
