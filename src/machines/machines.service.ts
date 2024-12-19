import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machinesRepository.find();
  }

  async findOne(id: string): Promise<Machine | null> {
    return this.machinesRepository.findOneBy({ id });
  }

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const machine = this.machinesRepository.create(createMachineDto);
    return this.machinesRepository.save(machine);
  }

  async update(id: string, updateMachineDto: UpdateMachineDto): Promise<Machine> {
    await this.machinesRepository.update(id, updateMachineDto);
    return this.machinesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.machinesRepository.delete(id);
  }
}
