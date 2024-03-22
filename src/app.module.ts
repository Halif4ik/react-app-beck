import { Module } from '@nestjs/common';
import * as path from "node:path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {TransformResponseInterceptor} from "./interceptor/response.interceptor";
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../public'),
    }),
    UserModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {
}
