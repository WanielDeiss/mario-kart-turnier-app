import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Turnier as TurnierModel } from '@prisma/client';
import { TurnierService } from './service/turnier/turnier.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly turnierService: TurnierService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  async createTurnier(
    @Body() postData: { name: string }
  ): Promise<TurnierModel> {
    const { name } = postData;
    console.log('postData', postData);
    console.log('name', name);
    return this.turnierService.createTurnier({
      name,
    });
  }
}
