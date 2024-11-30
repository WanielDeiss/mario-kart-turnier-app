import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma/prisma.service';
import { Participant, Prisma } from '@prisma/client';
import { TournamentService } from './tournament.service';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tournamentService: TournamentService
  ) {}

  async participant(
    participantWhereUniqueInput: Prisma.ParticipantWhereUniqueInput
  ): Promise<Participant | null> {
    return this.prisma.participant.findUnique({
      where: participantWhereUniqueInput,
    });
  }

  async participants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ParticipantWhereUniqueInput;
    where?: Prisma.ParticipantWhereInput;
    orderBy?: Prisma.ParticipantOrderByWithRelationInput;
  }): Promise<Participant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.participant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createParticipant(
    data: Prisma.ParticipantCreateInput
  ): Promise<Participant> {
    const tournament = this.tournamentService.transformTouramentData(
      await this.tournamentService.tournament({
        id: data.Tournament.connect.id,
      })
    );
    if (tournament.isExpired) {
      throw new Error('Tournament is already started');
    }
    return this.prisma.participant.create({
      data,
    });
  }

  async updateParticipant(params: {
    where: Prisma.ParticipantWhereUniqueInput;
    data: Prisma.ParticipantUpdateInput;
  }): Promise<Participant> {
    const { where, data } = params;
    return this.prisma.participant.update({
      data,
      where,
    });
  }

  async deleteParticipant(
    where: Prisma.ParticipantWhereUniqueInput
  ): Promise<Participant> {
    return this.prisma.participant.delete({
      where,
    });
  }

  transformDataToList(participants: Participant[]): {
    participants: string[];
    tournamentId: number;
  } {
    const resParticipants = [];
    let tournamentId: number;

    participants.forEach((participant, index) => {
      resParticipants.push(participant.name);
      if (tournamentId === undefined) tournamentId = participant.tournamentId;
      if (index < 1 && tournamentId !== participant.tournamentId)
        console.error('eeeh, the id is wrong');
    });

    return { tournamentId, participants: resParticipants };
  }
}
