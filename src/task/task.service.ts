import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {PrismaService} from "../prisma.service";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";
import {Task} from "@prisma/client";
import {PaginationTasksDto} from "./dto/pagination-task.dto";

@Injectable()
export class TaskService {
   private readonly logger: Logger = new Logger(TaskService.name);

   constructor(private userService: UserService,
               private prisma: PrismaService, private readonly configService: ConfigService) {
   }

   async create(createTaskDto: CreateTaskDto): Promise<Task> {
      const newTask: Task = await this.prisma.task.create({
         data: {
            name: createTaskDto.name,
            description: createTaskDto.description,
            priority: createTaskDto.priority,
            isComplite: createTaskDto.isComplite,
            owner: {
               connect: {
                  id: createTaskDto.ownerId
               }
            }
         },
      });
      this.logger.log(`Created new Task- ${newTask.id}`);
      return newTask;
   }

   async update(updateTaskDto: UpdateTaskDto, taskId: number): Promise<Task> {
      const updTask: Task | null = await this.prisma.task.update({
         where: {
            id: taskId,
         },
         data: updateTaskDto,
      });
      if (!updTask)
         throw new HttpException(`Task- ${taskId} dosent exist in bd`, HttpStatus.NO_CONTENT);

      this.logger.log(`Upd existed Task- ${updTask.id}`);
      return updTask;
   }


   async deleteTast(taskId: number): Promise<Task> {
      const updTask: Task | null = await this.prisma.task.delete({
         where: {
            id: taskId,
         },
      });
      if (!updTask)
         throw new HttpException(`Task- ${taskId} dosent exist in bd`, HttpStatus.NO_CONTENT);

      this.logger.log(`Deleted  Task- ${updTask.id}`);
      return updTask;
   }

   async findAll(paginationTasksDto: PaginationTasksDto): Promise<Task[]> {
      const {page, revert, start, limit} = paginationTasksDto;
      const order = revert ? 'desc' : 'asc';
      const lim: number = limit || +this.configService.get<number>('PAGE_PAGINATION')!;

      const books: Task[] = await this.prisma.task.findMany({
         skip: page ? (page - 1) * lim : start,
         take: lim,
         orderBy: {
            id: order,
         },
      });
      return books;
   }
}
