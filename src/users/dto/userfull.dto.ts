import { IsInt, IsString } from 'class-validator';

export class UserFullDTO {
  @IsInt()
  public id_user: number;

  @IsString()
  public name: string;

  @IsInt()
  public rank: number;
}
