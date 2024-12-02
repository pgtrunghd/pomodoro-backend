import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);

    return this.taskRepository.save(task);
  }

  async removeTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
    // return this.taskRepository.find();
  }

  async removeAllTasks(): Promise<void> {
    await this.taskRepository.clear();
  }

  async removeFinishedTasks(): Promise<void> {
    const tasks = await this.taskRepository.findBy({ isDone: true });
    await this.taskRepository.remove(tasks);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: { isDone: 'ASC' },
    });
  }
}
