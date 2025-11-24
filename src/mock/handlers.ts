import { HttpResponse, http } from "msw";

export const handlers = [
	http.get("/api/items", () => {
		return HttpResponse.json({
			id: "abc-123",
			firstName: "John",
			lastName: "Maverick",
		});
	}),
];
