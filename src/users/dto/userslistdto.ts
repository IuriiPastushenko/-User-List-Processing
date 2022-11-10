import { IsString } from 'class-validator';

export class UsersListDto {
	@IsString()
	public sort: string;
}
