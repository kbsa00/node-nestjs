import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository)
    private userRepository: UserRepository)
    {}

    signUp(authCrendetialsDto: AuthCredentialsDto) : Promise<void>{
        return this.userRepository.signUp(authCrendetialsDto);
    }
}
