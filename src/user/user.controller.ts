// import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity/user.entity';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @Roles('admin')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Patch(':id/top-up')
  @Roles('admin')
  topUp(@Param('id') id: number, @Body() user: Partial<UpdateUserDto>) {
    return this.userService.TopUp(id, user);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
