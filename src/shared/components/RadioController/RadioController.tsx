import React from "react";
import { Container, Radio, RadioGroup, Text, View } from "reshaped";
import * as styles from "./RadioController.css";

interface RadioItem {
	label: string;
	value: string;
}

interface RadioControllerProps {
	name: string;
	radioItems: RadioItem[];
	valueRef: React.RefObject<string>;
}

function RadioController(props: RadioControllerProps) {
	const { name, radioItems, valueRef } = props;
	const onChange = ({ value }: { value: string }) => {
		valueRef.current = value;
	};
	return (
		<Container className={styles.radioControllerContainer}>
			<Text variant={"featured-1"}>{name}</Text>
			<View direction={"row"} gap={2} className={styles.radioController}>
				<RadioGroup name={name} onChange={onChange}>
					{radioItems.map((item, idx) => (
						<Radio
							key={`${item.value}-${idx}`}
							size="large"
							value={item.value}
							className={styles.radio}
						>
							<Text variant={"featured-2"}>{item.label}</Text>
						</Radio>
					))}
				</RadioGroup>
			</View>
		</Container>
	);
}

export default RadioController;
