import { IsNotEmpty, IsString } from 'class-validator';

export class TokenCreateDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
