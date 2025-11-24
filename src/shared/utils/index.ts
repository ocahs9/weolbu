export const numberFormatter = (number: string) => {
	return number.replace(/[^0-9]/g, "");
};

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

//세자리 단위로 , 찍는 유틸리티 함수
export const priceFormatter = (price: string) => {
	const _price = numberFormatter(price);
	if (_price.length < 3) return _price;

	let ret = "";
	for (let i = _price.length - 1; i >= 0; i--) {
		ret = _price[i] + ret;
		if (i !== 0 && i % 3 === 0) ret = `,${ret}`;
	}
	return ret;
};

export const priceUnformatter = (price: string) => {
	return price.replace(/,/g, "");
};
