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

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(
    page: number = 1, 
    limit: number = 10, 
    orderDirection: 'ASC' | 'DESC' = 'ASC', 
    search: string = '' 
  ) {
    const orderBy: string = 'name'
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
    


    const new_data = data.map(user => {
      let users = []

      let u: ShowUserDto = {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type
      }

      users.push(u)
      return users
    })
    return {
      data: new_data,
      total,
      currentPage: page,
      totalPages,
    };
  }
  

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id })

    if (!user) throw new HttpException("user not found", 404)
    const show_user: ShowUserDto = {
      id: user.id, name: user.name, email: user.email, user_type: user.user_type
    }
    return show_user
  }

  async isAdmin(id: string) {

    const user = await this.userRepository.findOneBy({ id: id })

    if (!user) throw new HttpException("User not found", 404)

    const isAdmin = user.user_type === UserType.ADMIN ? true : false

    return isAdmin

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
