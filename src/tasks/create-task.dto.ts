import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  isDone: boolean = false;
}
