//response.data.data의 타입 예시
export interface HospitalInfo {
	name: string;
	phoneNumber: string;
	tags: string[];
	introduction: string | null;
	address: string;
	image: string | null;
	keywords: string | null;
	homepageUrl: string | null;
	latitude: number;
	longitude: number;
}
