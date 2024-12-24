import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserType } from './enums/user-type.enum';
import { Repository } from 'typeorm';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>
  const user = {
    id: 'f78dced8-8d53-4e22-b7d4-cf2bc5fd8f0d',
    name: 'Rodrigo Lopes',
    email: 'rodrigoplopes25@gmail.com'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: {
          findOneBy: jest.fn().mockResolvedValue(user)
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one user', async () => {

    
    const result = await service.findOne(user.id)

    expect(result).toEqual(user)


  })

  it('should throw a not found error.', async () => {

  jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(undefined);

  await expect(service.findOne(user.id)).rejects.toThrow(
    new HttpException('user not found', 404)
  );
});
});
