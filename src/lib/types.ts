export interface User {
	id?: string;
	name: string | null;
	username: string;
	email: string | null;
	password?: string;
	created?: Date | string | null;
	updated?: Date | string | null;
}
