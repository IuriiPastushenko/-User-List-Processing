import { IsEnum } from 'class-validator';

export enum nameOfColumns {
	id_user,
	name,
	rank,
}

export class UsersListDto {
	@IsEnum(nameOfColumns)
	public sort: string;
}
