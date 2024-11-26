import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Tournament as TournamentModel } from '@prisma/client';
import { TournamentService } from './service/tournament.service';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

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
    return this.tournamentService.tournaments({});
  }

  @Get(':id')
  async getTournament(@Param() id: string): Promise<TournamentModel> {
    return this.tournamentService.tournament({ id: parseInt(id) });
  }
}
