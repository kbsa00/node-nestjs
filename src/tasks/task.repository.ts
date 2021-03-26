import { Task } from './task.entity';
import { EntityRepository, Repository} from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dtio';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createdTaskDto: CreateTaskDto): Promise<Task>{
        const task = new Task();
        const {title, description} = createdTaskDto;
        
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        
        if(status){
            query.andWhere('task.status = :status', {status: status});
        }

        if(search){
            query.andWhere('(task.title LIKE :search or task.description LIKE :search)', {search: `%${search}%`});
        }
        
        const task = await query.getMany();
        return task;
    }
}