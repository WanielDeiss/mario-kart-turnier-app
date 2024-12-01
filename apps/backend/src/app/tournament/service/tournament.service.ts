import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma/prisma.service';
import { Tournament, Prisma } from '@prisma/client';

export interface TournamentResponse extends Tournament {
  isExpired: boolean;
}

@Injectable()
export class TournamentService {
  constructor(private readonly prisma: PrismaService) {}

  async tournament(
    tournamentWhereUniqueInput: Prisma.TournamentWhereUniqueInput
  ): Promise<Tournament | null> {
    return this.prisma.tournament.findUnique({
      where: tournamentWhereUniqueInput,
    });
  }

  async tournaments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TournamentWhereUniqueInput;
    where?: Prisma.TournamentWhereInput;
    orderBy?: Prisma.TournamentOrderByWithRelationInput;
  }): Promise<Tournament[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tournament.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTournament(
    data: Prisma.TournamentCreateInput
  ): Promise<Tournament> {
    return this.prisma.tournament.create({
      data,
    });
  }

  async updateTournament(params: {
    where: Prisma.TournamentWhereUniqueInput;
    data: Prisma.TournamentUpdateInput;
  }): Promise<Tournament> {
    const { where, data } = params;
    return this.prisma.tournament.update({
      data,
      where,
    });
  }

  async deleteTournament(
    where: Prisma.TournamentWhereUniqueInput
  ): Promise<Tournament> {
    await this.prisma.participant.deleteMany({
      where: { tournamentId: where.id },
    });
    return this.prisma.tournament.delete({
      where,
    });
  }

  async startTournament(tournamentId: { id: number }): Promise<Tournament> {
    return this.prisma.tournament.update({
      data: {
        isStarted: true,
      },
      where: {
        id: tournamentId.id,
      },
    });
  }

  async pauseTournament(tournamentId: { id: number }): Promise<Tournament> {
    return this.prisma.tournament.update({
      data: {
        isStarted: false,
      },
      where: {
        id: tournamentId.id,
      },
    });
  }

  transformTouramentData(tournament: Tournament): TournamentResponse {
    const isExpired =
      new Date(tournament.startDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0);
    return {
      ...tournament,
      isExpired,
    };
  }
}
