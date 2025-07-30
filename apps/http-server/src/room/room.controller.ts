import { Controller, Body, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomSchema, roomEndPoints } from '@repo/contract/room';
import z from 'zod';
import { Auth, GetUserFromToken } from '../auth/user.decorator';
import { TsRest } from '@ts-rest/nest';
import type { User } from '../auth/auth.controller';

export type CreateRoomDto = z.infer<typeof CreateRoomSchema>;

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Auth()
  @TsRest(roomEndPoints.createRoom)
  createRoom(@GetUserFromToken() user: User, @Body() payload: CreateRoomDto) {
    return this.roomService.createRoom(payload, user);
  }

  @Auth()
  @TsRest(roomEndPoints.getAllShapesInRoom)
  getAllShapesInRoom(
    @GetUserFromToken() user: User,
    @Query('roomId') roomId: string,
  ) {
    return this.roomService.getAllShapesInRoom(user, roomId);
  }
}
