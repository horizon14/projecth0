import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Todo} from './todo/entities/todo.entity';
import {TodoModule} from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:1114,
      username:'11',
      password:'11',
      database:'11',
      entities:[Todo],
      synchronize:true
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
