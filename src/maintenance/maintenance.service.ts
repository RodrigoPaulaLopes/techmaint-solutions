import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { ILike, In, Not, Repository } from 'typeorm';
import { Machine } from '../machines/entities/machine.entity';
import { User } from '../users/entities/user.entity';
import { MaintenanceStatus } from './enums/maintenance-status.enum';
import { EmailService } from '../email/email.service';
import { canceledMaintenanceTemplate, maintenanceTemplate } from '../email/views/maintenance.template';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance) private readonly maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(Machine) private readonly machineRepository: Repository<Machine>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) { }

  async create({ description, machine_id, dateMaintenance, techinician_ids, type }: CreateMaintenanceDto) {
    const parsedDate = new Date(dateMaintenance);

    // Verify if maintenance already exists for the same machine and date
    const maintenanceExists = await this.maintenanceRepository.findOne({
      where: { machine: { id: machine_id }, date_maintenance: parsedDate },
    });

    if (maintenanceExists) {
      throw new BadRequestException('Maintenance already scheduled for this machine at the specified time.');
    }

    // Verify if the maintenance date is valid
    const now = new Date();
    if (parsedDate <= now) {
      throw new BadRequestException('The maintenance date must be in the future.');
    }

    // Verify if the machine exists
    const machine = await this.machineRepository.findOneBy({ id: machine_id });
    if (!machine) {
      throw new NotFoundException('Machine not found.');
    }

    // Verify if all technicians exist
    const technicians = await this.userRepository.findBy({ id: In(techinician_ids) });
    if (technicians.length !== techinician_ids.length) {
      throw new NotFoundException('Some technicians not found.');
    }

    const data: Maintenance = {
      description,
      date_maintenance: parsedDate,
      machine,
      technicians,
      status: MaintenanceStatus.PENDING,
      type,
    };

    const new_maintenance = this.maintenanceRepository.create(data);
    const saved_maintenance = await this.maintenanceRepository.save(new_maintenance);

    if (saved_maintenance) {
      const template = maintenanceTemplate(saved_maintenance);
      this.emailService.sendEmail(technicians, `Maintenance Scheduled - ${saved_maintenance.machine.name}`, template);
    }

    return saved_maintenance;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    orderDirection: 'ASC' | 'DESC' = 'ASC',
    search: string = ''
  ) {


    if (page < 0) {
      page = 1
    }
    const orderBy: string = 'description'
    const order = {
      [orderBy]: orderDirection,
    };
    // const where: any = {};
    // if (search && search !== '') {
    //   where.name = ILike(`%${search}%`);
    //   where.email = ILike(`%${search}%`);
    // }
    const [maintenances, total] = await this.maintenanceRepository.findAndCount({
      where: {
        status: Not(MaintenanceStatus.CANCELED),
      },
      relations: ['machine', 'technicians'],
      skip: (page - 1) * limit,
      take: limit,
      order: order,

    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: maintenances,
      currentPage: page,
      limit,
      totalPages,
      totalRecords: total,
    };
  }

  async findOne(id: string) {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id: id, status: Not(MaintenanceStatus.CANCELED) },
      relations: ['machine', 'technicians'],
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found.`);
    }

    return maintenance;
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto) {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
      relations: ['technicians', 'machine'],
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found.`);
    }

    const { dateMaintenance, status } = updateMaintenanceDto;

    if (dateMaintenance) {
      const parsedDate = new Date(dateMaintenance);

      const conflictingMaintenance = await this.maintenanceRepository.findOne({
        where: {
          date_maintenance: parsedDate,
          id: Not(id),
        },
      });

      if (conflictingMaintenance) {
        throw new BadRequestException('There is already maintenance scheduled for this date.');
      }

      maintenance.date_maintenance = parsedDate;
    }
    if (status) {
      maintenance.status = status;
    }

    if (status === MaintenanceStatus.IN_PROGRESS) {
      const date = new Date();

      maintenance.init_date = date
    }
    if (status === MaintenanceStatus.COMPLETED) {
      const date = new Date();

      maintenance.end_date = date
    }



    Object.assign(maintenance, updateMaintenanceDto);

    const savedMaintenance = await this.maintenanceRepository.save(maintenance);


    const template = savedMaintenance.status === MaintenanceStatus.CANCELED ? canceledMaintenanceTemplate(savedMaintenance) : maintenanceTemplate(savedMaintenance);
    const title = savedMaintenance.status === MaintenanceStatus.CANCELED ? `Maintenance Canceled - ${maintenance.machine.name}` : `Maintenance Updated - ${savedMaintenance.machine.name}`
    this.emailService.sendEmail(
      savedMaintenance.technicians,
      title,
      template
    );

    return savedMaintenance;
  }


  async remove(id: string) {
    const maintenance = await this.maintenanceRepository.findOneBy({ id });
    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found.`);
    }

    maintenance.status = MaintenanceStatus.CANCELED

    await this.maintenanceRepository.update(id, maintenance);
    const template = canceledMaintenanceTemplate(maintenance)

    this.emailService.sendEmail(
      maintenance.technicians,
      `Maintenance Canceled - ${maintenance.machine.name}`,
      template
    );
    return { message: `Maintenance with ID ${id} has been successfully canceled.` };
  }
}
