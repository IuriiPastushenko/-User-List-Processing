import { IsEmail, IsString } from 'class-validator';

export class UserDto {
	@IsEmail()
	public name: string;
	@IsString()
	public runk: string;
}
