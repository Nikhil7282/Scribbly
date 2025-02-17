import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AuthStrategy } from '../auth/auth.strategy';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
