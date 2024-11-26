import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma/prisma.service';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentService } from './tournament/service/tournament.service';

@Module({
  imports: [],
  controllers: [AppController, TournamentController],
  providers: [AppService, PrismaService, TournamentService],
})
export class AppModule {}
