import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCustomer, CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) { }

  //   handles the post request to /customers/create endpoint to create new user
  @Post('/create')
  async signUp(@Body() customer: CreateCustomer) {
    return await this.customerService.createCustomer(customer);
  }

  @Get("/")
  async getAllcustomers() {
    return await this.customerService.getAllCustomers();
  }

  @Get('/:id')
  async getcustomerById(@Param('id') id: number) {
    return this.customerService.findOneById(id);
  }


  @Delete('/:id')
  async deleteCustomerById(@Param('id') id: number){
    return this.customerService.deleteCustomerById(id);
  }
}
