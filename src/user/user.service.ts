import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {ConfigService} from "@nestjs/config";
import {User} from "@prisma/client";

@Injectable()
export class UserService implements OnApplicationBootstrap {
   private readonly logger: Logger = new Logger(UserService.name);

   constructor(private prisma: PrismaService, private readonly configService: ConfigService) {
   }

   async onApplicationBootstrap(): Promise<void> {
      await this.createUser();
   }

   async createUser(): Promise<User> {
      const newUser: User = await this.prisma.user.upsert({
         where: {
            email: this.configService.get<string>('USER_EMAIL'),
         },
         create: {
            email: this.configService.get<string>('USER_EMAIL')!,
            name: this.configService.get<string>('USER_NAME')!,
         },
         update: {},
      });
      this.logger.log(`Created or found user- ${newUser.email}`);
      return newUser;
   }

}
