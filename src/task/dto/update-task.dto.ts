import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {Transform} from "class-transformer";
import {IsNotEmpty, IsNumber, Min} from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}
