import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserType } from './enums/user-type.enum';
import { Repository } from 'typeorm';
import { HttpException, NotFoundException } from '@nestjs/common';
import { find } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>
  const users = {
    "currentPage": 1,
    "data": [{
      "email": "rodrigoplopes25@gmail.com",
      "id": "f78dced8-8d53-4e22-b7d4-cf2bc5fd8f0d",
      "name": "Rodrigo Lopes"
    }],
    "total": 10,
    "totalPages": 1
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([
              users.data,
              users.total,
            ]),
            findOneBy: jest.fn().mockResolvedValue(users.data[0])
          }
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined()
  });


  describe("Find Functions", () => {


    it('whould return all users', async () => {
      const result = await service.findAll(1, 10)

      expect(result).toEqual(users)
    })

    it('should find one user', async () => {

      const result = await service.findOne(users.data[0].id)

      expect(result).toEqual(users.data[0])

    })

    it('should throw a not found error.', async () => {

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(service.findOne(users.data[0].id)).rejects.toThrow(
        new HttpException('user not found', 404)
      );
    })
  });
});
