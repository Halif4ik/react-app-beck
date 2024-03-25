import {IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";
import {Priority, Status} from "@prisma/client";

export class CreateTaskDto {
   @Transform(({value}) => isNaN(parseInt(value)) ? 0 : parseInt(value),)
   @IsNotEmpty()
   @IsNumber({},{message: 'ownerId should be number more then 1'})
   @Min(1)
   readonly ownerId: number;

   @Transform(({value}) => isNaN(parseInt(value)) ? -1 : parseInt(value),)
   @IsNotEmpty()
   @IsNumber({},{message: 'ownerId should be number more then 0'})
   @Min(0)
   readonly order: number;

   @IsString({message: 'name should be string'})
   @Length(4, 25, {message: 'name Min lenth 4 max length 25'})
   readonly name: string;

   @IsString({message: 'description should be string'})
   @Transform(({value}: TransformFnParams) => escape(value))
   @Length(2, 500, {message: 'Description Min lenth 2 max length 500'})
   readonly description: string;

   @IsEnum(Priority)
   @Transform(({value}: TransformFnParams) => value.toLowerCase())
   @IsOptional()
   readonly priority: Priority;


   /*@Transform(({value}) => {
       if (value.toString() === 'true') return true;
       else if( value.toString() === 'false') return false;
       return null;
   })
   @IsBoolean({message: 'isComplite should be set true or false'})
   readonly isComplite: boolean;*/

   @IsEnum(Status)
   @Transform(({value}: TransformFnParams) => value.toLowerCase())
   @IsOptional()
   readonly status: Status;

}
