import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dtio';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}


    @Get("/")
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.taskService.getTasks(filterDto);
    }

    @Get("/:id")
    getATaskById(@Param('id', ParseIntPipe) id : number): Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskService.createTask(createTaskDto)
    }

    @Delete("/:id")
    deleteTaskById(@Param("id") id: number): void{
        this.taskService.deleteTaskById(id);
    }

    @Patch("/:id")
    updateTaskById(@Param('id', ParseIntPipe) id,
        @Body('status', TaskStatusValidationPipe) status : TaskStatus) : Promise<Task>{
        return this.taskService.updateTaskById(id, status);
    }

/*
    @Get()
    getTask(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskWitFilters(filterDto)
        }else return this.taskService.getAllTasks();
    }
    */
}
