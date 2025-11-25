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
	if (_price.length <= 3) return _price;

	// 뒤집어서 3자리 단위로 콤마 추가
	const reversed = _price.split("").reverse();
	let result = [];

	for (let i = 0; i < reversed.length; i++) {
		result.push(reversed[i]);
		if ((i + 1) % 3 === 0 && i !== reversed.length - 1) {
			result.push(",");
		}
	}

	return result.reverse().join("");
};

export const priceUnformatter = (price: string) => {
	return price.replace(/,/g, "");
};
