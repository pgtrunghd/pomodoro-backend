import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.taskService.removeTask(id);
  }

  @Post('delete-all')
  removeAll(): Promise<void> {
    return this.taskService.removeAllTasks();
  }

  @Post('delete-finished')
  removeFinished(): Promise<void> {
    return this.taskService.removeFinishedTasks();
  }
}
