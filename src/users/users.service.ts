import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ShowUserDto } from './dto/show-user.dto';
import { UserType } from './enums/user-type.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto); 
    return await this.userRepository.save(user); 
  }


  async findAll(
    page: number = 1,
    limit: number = 10,
    orderDirection: 'ASC' | 'DESC' = 'ASC',
    search: string = ''
  ) {
    const orderBy: string = 'name'; 

    if (page < 1) {
      page = 1; 
    }

    const skip = (page - 1) * limit; 
    const take = limit; 

    const order = {
      [orderBy]: orderDirection,
    };

    const where: any = {};

    if (search && search !== '') {
      where.name = ILike(`%${search}%`);
      where.email = ILike(`%${search}%`);
    }

    const [data, total] = await this.userRepository.findAndCount({
      skip,
      take,
      order,
      where,
    });

    const totalPages = Math.ceil(total / limit);


    const formattedData = data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    }));

    return {
      data: formattedData,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) throw new HttpException('User not found', 404);

    const showUser: ShowUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    };

    return showUser;
  }
  async isAdmin(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) throw new HttpException('User not found', 404);

    return user.user_type === UserType.ADMIN;
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, 404);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }


  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, 404);
    }

    await this.userRepository.remove(user); 
    return { message: `User with ID ${id} has been removed` }; 
  }
}
