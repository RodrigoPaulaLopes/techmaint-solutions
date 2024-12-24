import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { In, Repository } from 'typeorm';
import { Machine } from '../machines/entities/machine.entity';
import { User } from '../users/entities/user.entity';
import { MaintenanceStatus } from './enums/maintenance-status.enum';
import { EmailService } from '../email/email.service';

@Injectable()
export class MaintenanceService {

  constructor(
    @InjectRepository(Maintenance) private readonly maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(Machine) private readonly machineRepository: Repository<Machine>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) {

  }
  async create({ description, machine_id, dateMaintenance, techinician_ids, type }: CreateMaintenanceDto) {
    // verify if maintenance already exists
    const parsedDate = new Date(dateMaintenance)
    const maintenance = await this.maintenanceRepository.find({
      where: {
        machine: {
          id: machine_id,

        },
        date_maintenance: parsedDate
      }
    })

    if (!maintenance) throw new BadRequestException('Maintenance already scheduled')


    // verify if the date are able
    const now = new Date();

    if (await this.maintenanceRepository.findOneBy({ date_maintenance: parsedDate }))
      throw new BadRequestException("There is already maintenance scheduled for this time.")

    if (parsedDate <= now) {
      throw new BadRequestException(
        'The maintenance date must be in the future.',
      );
    }

    // verify if machine exists
    const machine = await this.machineRepository.findOneBy({ id: machine_id })
    if (!machine) throw new NotFoundException("Machine not found.")

    // verify if technician exists

    const technicians = await this.userRepository.findBy({ id: In(techinician_ids) });


    if (technicians.length !== techinician_ids.length) {
      throw new NotFoundException('Some technicians not found');
    }

    const data: Maintenance = {
      description: description,
      date_maintenance: parsedDate,
      machine: machine,
      technicians: technicians,
      status: MaintenanceStatus.PENDING,
      type: type
    }

    const new_maintenance = this.maintenanceRepository.create(data)
    const new_data = await this.maintenanceRepository.save(new_maintenance)

    if (new_data) {
      const template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Maintenance Scheduled</title>
            </head>
            <body>
                <h2>Maintenance Scheduled - [Machine/Equipment Name]</h2>
                <p>Hello <strong>[Technician's Name]</strong>,</p>
                <p>We would like to inform you that a new maintenance has been scheduled for the equipment <strong>[Machine/Equipment Name]</strong>.</p>

                <h3>Maintenance Details:</h3>
                <ul>
                    <li><strong>Maintenance Date:</strong> [Maintenance Date and Time]</li>
                    <li><strong>Description:</strong> [Maintenance Description]</li>
                    <li><strong>Maintenance Type:</strong> [Maintenance Type]</li>
                    <li><strong>Status:</strong> [Maintenance Status]</li>
                </ul>

                <p>Please make sure to be available on the scheduled date and time to carry out the necessary tasks.</p>

                <p>If there are any issues or if you need further information, please don't hesitate to contact us.</p>

                <p>Best regards,<br>
                [Your Name or Company Name]<br>
                [Contact Information]</p>
            </body>
            </html>
      `
      this.emailService.sendEmail(technicians, "Maintenance Scheduled - [Machine/Equipment Name]", template)
    }
    return new_data
  }

  findAll() {
    return `This action returns all maintenance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return `This action updates a #${id} maintenance`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenance`;
  }
}
