import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import ErrorHandlerHttpRequests from 'src/utils/ErrorHandlerHttpRequests';

export interface CreateUser {
  email: string;
  password: string;
  typeid: string;
  idnumber: string;
  name: string;
  lastname: string;
}

@Injectable()
export class UsersService {
  private userRepository: Repository<UserEntity>;
  private logger = new Logger();
  
  // inject the Datasource provider
  constructor(private dataSource: DataSource) {
    // get users table repository to interact with the database
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  //  create handler to create new user and save to the database
  async createUser(createUser: CreateUser): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.create(createUser);
      return await this.userRepository.save(user);
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }

  // retrieve  all users
  async getAllUsers(): Promise<UserEntity[] | undefined> {
    try {
      const users = await this.userRepository.find()
      return users;
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }

  // retrieve an user by its id
  async findOneById(id: number): Promise<UserEntity | null | undefined> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }

  // delete user by id
  async deleteUserById(id: number): Promise<DeleteResult | undefined> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return {
          raw: {},
          affected: 0
        };
      }
      return await this.userRepository.delete({ id });
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }
}

