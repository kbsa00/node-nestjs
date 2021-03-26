import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dtio';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async getTasks(filterDto: GetTaskFilterDto) : Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with id ${id} was not found`);
        }
        return found;
    }

    async createTask(createdTaskDto: CreateTaskDto): Promise<Task>{
       return this.taskRepository.createTask(createdTaskDto);
    }


    async deleteTaskById(id : number) : Promise<void>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`This task with id ${id} was not found`);
        }
        await this.taskRepository.delete(found);
    }

    async updateTaskById(id : number, status : TaskStatus ) : Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    /*

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskWitFilters(filterDto: GetTaskFilterDto) : Task[]{
        const {status, search}  = filterDto;
        let tasks = this.getAllTasks();
        
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => {
                task.title.includes(search) || task.description.includes(search);
            });
        }
        
        return tasks;
    }

    updateTaskById(id : string, status : TaskStatus ) : Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task
    }
    */
    
}
