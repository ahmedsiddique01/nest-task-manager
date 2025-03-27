import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { PassportModule } from '@nestjs/passport/dist/passport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
    exports: [PassportModule],
})
export class TasksModule {}
