import { Controller, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { Auth, GetUserFromToken } from '../auth/user.decorator';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import type { User } from '../auth/auth.controller';
import { contract } from '@repo/contract/client';

const RoomContract = nestControllerContract(contract.roomContract);

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Auth()
  @TsRest(RoomContract.createRoom)
  createRoom(@GetUserFromToken() user: User) {
    return this.roomService.createRoom(user);
  }

  @Auth()
  @TsRest(RoomContract.getAllShapesInRoom)
  getAllShapesInRoom(
    @GetUserFromToken() user: User,
    @Query('roomId') roomId: string,
  ) {
    return this.roomService.getAllShapesInRoom(user, roomId);
  }
}
