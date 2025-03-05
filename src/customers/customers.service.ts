import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import ErrorHandlerHttpRequests from 'src/utils/ErrorHandlerHttpRequests';
import { UserEntity } from 'src/users/user.entity';


export interface CreateCustomer {
  email: string;
  password: string;
  typeid: string;
  idnumber: string;
  name: string;
  lastname: string;
  birthdate: string;
  workerid: number;
  user: UserEntity;
}

@Injectable()
export class CustomersService {
  private customerRepository: Repository<CustomerEntity>;
  private userRepository: Repository<UserEntity>;

  constructor(private dataSource: DataSource) {
    this.customerRepository = this.dataSource.getRepository(CustomerEntity);
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  //  create handler to create new customer based on user id and save to the database
  async createCustomer(createCustomer: CreateCustomer): Promise<CustomerEntity | undefined> {
    try {
      const { workerid } = createCustomer;
      if (workerid) {
        const user = await this.userRepository.findOneBy({ id: workerid });
        if (!user) {
          // Manejo de caso cuando el usuario no se encuentra
          throw new HttpException('Worker not found', HttpStatus.NOT_FOUND);
        }
        createCustomer.user = user;
      }
      const customer = await this.customerRepository.create(createCustomer);
      return await this.customerRepository.save(customer);
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }

  // retrieve  all customers
  async getAllCustomers(): Promise<CustomerEntity[] | undefined> {
    try {
      const customers = await this.customerRepository.find()
      return customers;
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }

  // retrieve an customer by its id
  async findOneById(id: number): Promise<CustomerEntity | null | undefined> {
    try {
      const customer = await this.customerRepository.findOneBy({ id });
      return customer;
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }

  // delete customber by id
  async deleteCustomerById(id: number): Promise<DeleteResult | undefined> {
    try {
      const customer = await this.customerRepository.findOneBy({ id });
      if (!customer) {
        return {
          raw: {},
          affected: 0
        };
      }
      return await this.customerRepository.delete({ id });
    } catch (err) {
      ErrorHandlerHttpRequests(err);
    }
  }
}
