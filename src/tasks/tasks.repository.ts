import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(
    filterDto: GetTasksFilterDto,
    user:User
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });
    if(status){
        query.andWhere('task.status = :status', { status });
    }

    if(search){
        const searchTerm = `%${search.toLowerCase()}%`;
        query.andWhere(
            '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
            { search: searchTerm },
        );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto, 
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
