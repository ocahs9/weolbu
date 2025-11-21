import React from "react";
import type { TextFieldProps } from "reshaped";
import {
	Badge,
	Button,
	Container,
	Text,
	TextArea,
	TextField,
	View,
} from "reshaped";

import * as styles from "./Index.css";

function Index() {
	return (
		<Container width="652px" height={"10vh"} className={styles.index}>
			<Button href="/">Get started</Button>
			<CustomTextField />
			<Text variant={{ m: "title-5", s: "title-6" }}>Hello</Text>
			<View gap={3} align="center">
				<Badge rounded color="primary">
					unit-x4
				</Badge>
				<Badge color="warning" rounded>
					shadow-elevated
				</Badge>
				<Badge rounded>color-background-primary</Badge>
			</View>
		</Container>
	);
}

export default Index;

function CustomTextField() {
	return (
		<TextField
			size={"large"}
			name="custom-text-field"
			className={styles.input}
		/>
	);
}
