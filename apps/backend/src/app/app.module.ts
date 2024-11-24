import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma/prisma.service';
import { TurnierService } from './service/turnier/turnier.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, TurnierService],
})
export class AppModule {}
