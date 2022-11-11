import { IsInt, IsString } from 'class-validator';

export class UserDTO {
	@IsString()
	public name: string;

	@IsInt()
	public rank: number;
}
