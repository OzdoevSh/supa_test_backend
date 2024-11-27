import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { IssuesController } from './issue/issue.controller';
import { IssuesService } from './issue/issue.service';
import { LogModule } from './log/log.module';
import { LogController } from './log/log.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    LogModule,
  ],
  controllers: [AppController, IssuesController, LogController],
  providers: [IssuesService],
})
export class AppModule {}
