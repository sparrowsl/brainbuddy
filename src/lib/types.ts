export type User = {
	id?: string;
	name: string;
	username: string;
	email?: string;
	password?: string;
	created?: Date | string;
	updated?: Date | string;
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
