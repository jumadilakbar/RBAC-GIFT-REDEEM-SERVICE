import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  //async create(user: User): Promise<User> {
  async create(createUserDto: CreateUserDto) {
    try {
      const emailExists: User = await this.findByEmail(createUserDto.email);
      const usernameExists: User = await this.findByUsername(
        createUserDto.username,
      );
      if (emailExists) {
        throw new Error(
          `email ${createUserDto.email} is alreeady used. Please use another email address !`,
        );
      }
      if (usernameExists) {
        throw new Error(
          `email ${createUserDto.username} is alreeady used. Please use another username !`,
        );
      }
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      return this.userRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
  }

  async TopUp(id: number, user: Partial<UpdateUserDto>) {
    await this.userRepository.update(id, user);
    return { message: 'Top up success' };
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
