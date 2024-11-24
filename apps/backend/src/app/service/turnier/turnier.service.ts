import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Turnier, Prisma } from '@prisma/client';

@Injectable()
export class TurnierService {
  constructor(private prisma: PrismaService) {}

  async turnier(
    turnierWhereUniqueInput: Prisma.TurnierWhereUniqueInput
  ): Promise<Turnier | null> {
    return this.prisma.turnier.findUnique({
      where: turnierWhereUniqueInput,
    });
  }

  async turniers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TurnierWhereUniqueInput;
    where?: Prisma.TurnierWhereInput;
    orderBy?: Prisma.TurnierOrderByWithRelationInput;
  }): Promise<Turnier[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.turnier.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTurnier(data: Prisma.TurnierCreateInput): Promise<Turnier> {
    return this.prisma.turnier.create({
      data,
    });
  }

  async updateTurnier(params: {
    where: Prisma.TurnierWhereUniqueInput;
    data: Prisma.TurnierUpdateInput;
  }): Promise<Turnier> {
    const { where, data } = params;
    return this.prisma.turnier.update({
      data,
      where,
    });
  }

  async deleteTurnier(where: Prisma.TurnierWhereUniqueInput): Promise<Turnier> {
    return this.prisma.turnier.delete({
      where,
    });
  }
}
