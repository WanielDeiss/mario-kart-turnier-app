import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  Tournament as TournamentModel,
  Participant as ParticipantModel,
} from '@prisma/client';
import { TournamentService } from './service/tournament.service';
import { ParticipantService } from './service/participant.service';

@Controller('tournament')
export class TournamentController {
  constructor(
    private readonly tournamentService: TournamentService,
    private readonly participantService: ParticipantService
  ) {}

  @Post()
  async createTournament(
    @Body() postData: { name: string; startDate: Date }
  ): Promise<TournamentModel> {
    const { name, startDate } = postData;
    return this.tournamentService.createTournament({
      name,
      startDate,
    });
  }

  @Get()
  async getTournaments(): Promise<TournamentModel[]> {
    const tournaments = await this.tournamentService.tournaments({
      orderBy: { startDate: 'desc' },
    });
    return tournaments.map((tournament) =>
      this.tournamentService.transformTouramentData(tournament)
    );
  }

  @Get(':id')
  async getTournament(@Param('id') id: string): Promise<TournamentModel> {
    return this.tournamentService.transformTouramentData(
      await this.tournamentService.tournament({ id: parseInt(id) })
    );
  }

  @Patch(':id/start')
  async startTournament(@Param('id') id: string): Promise<TournamentModel> {
    return this.tournamentService.startTournament({ id: parseInt(id) });
  }

  @Patch(':id/pause')
  async pauseTournament(@Param('id') id: string): Promise<TournamentModel> {
    return this.tournamentService.pauseTournament({ id: parseInt(id) });
  }

  @Delete(':id')
  async deleteTournament(@Param('id') id: string): Promise<TournamentModel> {
    return this.tournamentService.deleteTournament({ id: parseInt(id) });
  }

  @Get(':id/participant')
  async getAllParticipantsFromTournament(@Param('id') id: string) {
    const dbParticipants = await this.participantService.participants({
      where: {
        tournamentId: parseInt(id),
      },
    });
    return this.participantService.transformDataToList(dbParticipants);
  }

  @Post(':id/participant')
  async addParticipant(
    @Param('id') id: string,
    @Body() postData: { name: string }
  ): Promise<ParticipantModel> {
    const { name } = postData;

    return this.participantService.createParticipant({
      name,
      Tournament: { connect: { id: parseInt(id) } },
    });
  }
}
