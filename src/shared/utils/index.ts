export const phoneNumberFormatter = (phoneNumber: string) => {
	let digitsOnly = phoneNumber.replace(/\D/g, "");
	if (digitsOnly.length > 11) {
		digitsOnly = digitsOnly.slice(0, 11);
	}

	let formatted = "";
	if (digitsOnly.length <= 3) {
		formatted = digitsOnly;
	} else if (digitsOnly.length <= 7) {
		formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
	} else {
		formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7)}`;
	}

	return formatted;
};

export const phoneNumberUnformatter = (phoneNumber: string) => {
	return phoneNumber.replace(/-/g, "");
};
