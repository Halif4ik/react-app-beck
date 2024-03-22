import {
   Controller,
   Get,
   Post,
   Body,
   HttpCode,
   ValidationPipe,
   UsePipes,
   Patch,
   ParseIntPipe,
   Param, Delete, Query
} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from "./dto/update-task.dto";
import {Task} from "@prisma/client";
import {PaginationTasksDto} from "./dto/pagination-task.dto";


@Controller('task')
export class TaskController {
   constructor(private readonly taskService: TaskService) {
   }

   //1.Temp User can create new task
   //Endpoint: Post /api/task/create
   @Post('create')
   @HttpCode(200)
   @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
   async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
      return this.taskService.create(createTaskDto);
   }

   //2. Temp user can update his task
   // Endpoint : Update /api/task/update/1
   @Patch('update/:taskId')
   @HttpCode(200)
   @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
   async update(@Body() updateTaskDto: UpdateTaskDto, @Param('taskId', ParseIntPipe) taskId: number):
       Promise<Task> {
      return this.taskService.update(updateTaskDto, taskId);
   }

   //2. Temp user can update his task
   // Endpoint : Update /api/task/del/4
   @Delete('del/:taskId')
   @HttpCode(200)
   @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
   async deleteTast( @Param('taskId', ParseIntPipe) taskId: number):
       Promise<Task> {
      return this.taskService.deleteTast( taskId);
   }

   //3.All Users can all get tasks
   //Endpoint: Get /api/task/all?page=1&revert=false&limit=2&start=2
   @Get('all')
   @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
   async findAll(@Query() paginationTasksDto: PaginationTasksDto): Promise<Task[]> {
      return this.taskService.findAll(paginationTasksDto);
   }
}
