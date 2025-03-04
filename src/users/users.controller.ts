import { Body, Controller,Param, Post, Get } from '@nestjs/common';
import { CreateUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('/create')
  //   handles the post request to /users/create endpoint to create new user
  async signUp(@Body() user: CreateUser) {
    return await this.userService.createUser(user);
  }

  @Get("/")
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }


  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Get('/salute')
  getSalute() {
    return this.userService.getUserSalute();
  }
}
