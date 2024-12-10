export type User = {
	id?: string;
	name: string | null;
	username: string;
	email: string | null;
	password?: string;
	created?: Date | string | null;
	updated?: Date | string | null;
};

export type Room = {
	id?: string;
	name: string;
	description: string;
	created?: Date | string;
	updated?: Date | string;
	// participants:string
	host?: User;
	topicId?: string;
};

export type Message = {
	id?: string;
	body: string;
	created?: Date | string;
	updated?: Date | string;
	roomId?: string;
	userId?: string;
};

export type Topic = {
	id?: string;
	name: string;
	created?: Date | string;
	updated?: Date | string;
};
