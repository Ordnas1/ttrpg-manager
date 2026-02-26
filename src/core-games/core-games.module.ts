import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { SystemController } from './controllers/system.controller';
import { SystemService } from './services/system.service';
import { SystemMapperService } from './dtos/system/system.mapper.service';
import { Game } from './entities/game.entity';
import { GameClub } from './entities/game-club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System, Game, GameClub])],
  controllers: [SystemController],
  providers: [SystemService, SystemMapperService],
})
export class CoreGamesModule {}
