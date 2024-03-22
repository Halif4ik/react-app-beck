import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService,],
  imports:[UserModule,ConfigModule]
})
export class TaskModule {}
