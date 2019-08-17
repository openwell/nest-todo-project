import { Module } from '@nestjs/common';
import { TodoController } from './todos.controllers';
import { TodoService } from './todos.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodosModule {}
