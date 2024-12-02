import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}
