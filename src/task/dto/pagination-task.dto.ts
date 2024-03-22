import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {Transform} from "class-transformer";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min} from "class-validator";

export class PaginationTasksDto  {
   @Transform(({value}) => isNaN(parseInt(value)) ? 1 : parseInt(value),)
   @IsNumber({}, {message: 'Page should be Number'})
   @IsOptional()
   @Min(1)
   page: number;

   @Transform(({value}) => isNaN(parseInt(value)) ? 1 : parseInt(value),)
   @IsNumber({}, {message: 'Limit should be Number more than 0'})
   @IsOptional()
   @Min(1)
   limit: number;

   @Transform(({value}) => isNaN(parseInt(value)) ? -1 : parseInt(value),)
   @IsNumber({}, {message: 'Start should be number'})
   @IsOptional()
   @Min(0)
   start: number;

   @Transform(({value}) => {
          if (value.toString() === 'true') return true;
          else if (value.toString() === 'false') return false;
          return null;
       }
   )
   @IsBoolean({message: 'Revert should be boolean'})
   @IsOptional()
   revert: boolean;
}
