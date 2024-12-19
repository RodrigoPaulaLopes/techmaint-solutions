import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { TokenGuard } from '../guards/token/token.guard';
import { UserParam } from '../decorators/user/user.decorator';
import { ShowUserDto } from '../users/dto/show-user.dto';

@UseGuards(TokenGuard)
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) { }

  @Get()
  async findAll(@UserParam() user: ShowUserDto) {
    console.log(user);
    
    return this.machinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const machine = await this.machinesService.findOne(id);
    if (!machine) {
      throw new NotFoundException('Machine not found');
    }
    return machine;
  }

  @Post()
  async create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.machinesService.remove(id);
  }
}
