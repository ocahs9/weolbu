import React from "react";
import { Checkbox, CheckboxGroup, Text, View } from "reshaped";
import type { SortItem } from "../types";
import * as styles from "./SortBox.css.ts";

interface FilterBoxProps {
	sortItems: SortItem[];
	handleSortChange: (value: string | undefined) => void;
}

function SortBox(props: FilterBoxProps) {
	const { sortItems, handleSortChange } = props;

	return (
		<View className={styles.sortRadioView}>
			{sortItems.map((item, idx) => (
				<Checkbox
					key={`${item.label}-${idx}`}
					name={item.label}
					size={"large"}
					value={item.value}
					className={styles.checkboxClass}
					onChange={({ value }) => {
						handleSortChange(value);
					}}
				>
					<Text variant={"featured-3"}>{item.label}</Text>
				</Checkbox>
			))}
		</View>
	);
}

export default SortBox;
