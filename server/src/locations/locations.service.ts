import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LocationsService {

  constructor(private prisma: PrismaService) { }

  create(createLocationDto: CreateLocationDto) {
    return this.prisma.locations.create({
      data: createLocationDto,
    });
  }

  findAll() {
    return this.prisma.locations.findMany();
  }

  findOne(id: string) {
    return this.prisma.locations.findUnique({
      where: { id }
    });
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.prisma.locations.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  remove(id: string) {
    return this.prisma.locations.delete({
      where: { id }
    });
  }
}
