import { useEffect, useState } from "react";
import type { Icon as IconType } from "react-feather";
import { FormControl, Text, TextField } from "reshaped";
import type { ZodString } from "zod";
import * as styles from "./InputController.css";

interface InputControllerProps {
	label: string;
	valueRef: React.RefObject<string>;
	icon?: IconType;
	schema?: ZodString;
	formatter?: (value: string) => string;
	placeholder?: string;
	password?: boolean;
}

function InputController(props: InputControllerProps) {
	const { label, placeholder, valueRef, schema, password, icon, formatter } =
		props;
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [controlledValue, setControlledValue] = useState<string>("");

	const onChange = ({ value }: { value: string }) => {
		if (formatter) {
			setControlledValue(formatter(value));
			valueRef.current = formatter(value);
			return;
		}

		valueRef.current = value;
		if (schema) {
			const result = schema.safeParse(value);
			if (!result.success) {
				setErrorMessage(result.error.issues[0].message);
			} else {
				setErrorMessage(null);
			}
		}
	};

	return (
		<div className={styles.formControl}>
			<FormControl hasError={!!errorMessage}>
				<FormControl.Label>
					<Text variant={"featured-1"} className={styles.formText}>
						{label}
					</Text>
				</FormControl.Label>
				<TextField
					inputAttributes={{ type: password ? "password" : "text" }}
					icon={icon ? icon : undefined}
					name={label}
					placeholder={`${placeholder ? placeholder : `${label}을 입력해주세요.`}`}
					size={"xlarge"}
					onChange={onChange}
					value={formatter ? controlledValue : undefined}
				/>
				<FormControl.Error>
					<Text variant={"featured-3"} className={styles.formText}>
						{errorMessage}
					</Text>
				</FormControl.Error>
			</FormControl>
		</div>
	);
}

export default InputController;
