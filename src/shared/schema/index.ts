import z from "zod";

export const passwordSchema = z
	.string()
	.min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
	.max(10, "비밀번호는 최대 10자 이하이어야 합니다.")
	.refine(
		(val) => {
			const hasLower = /[a-z]/.test(val);
			const hasUpper = /[A-Z]/.test(val);
			const hasDigit = /\d/.test(val);
			return [hasLower, hasUpper, hasDigit].filter(Boolean).length >= 2;
		},
		{
			message:
				"영문 소문자, 영문 대문자, 숫자 중 최소 두 가지 이상을 포함해야 합니다.",
		},
	);
