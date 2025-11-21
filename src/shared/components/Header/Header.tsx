import React from "react";
import * as styles from "./Header.css";

interface HeaderProps {
	title: string;
	isLeftIcon?: boolean;
	isRightIcon?: boolean;
	onClickLeft?: () => void;
	onClickRight?: () => void;
}

function Header(props: HeaderProps) {
	const {
		title = "",
		isLeftIcon,
		isRightIcon,
		onClickLeft,
		onClickRight,
	} = props;

	return (
		<header className={styles.header}>
			{isLeftIcon && (
				<button
					type="button"
					onClick={onClickLeft}
					className={styles.headerLeftIcon}
				/>
			)}
			<h1 className={styles.headerText}>{title}</h1>
			{isRightIcon && (
				<button
					type="button"
					onClick={onClickRight}
					className={styles.headerRightIcon}
				/>
			)}
		</header>
	);
}

export default Header;
