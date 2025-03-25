import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './room.controller';
import { User } from '../auth/auth.controller';
import { prismaClient } from '@repo/db/client';

@Injectable()
export class RoomService {
  async createRoom(payload: CreateRoomDto, user: User) {
    const roomExist = await prismaClient.rooms.findFirst({
      where: { name: payload.roomName, adminId: user.id },
    });

    if (roomExist) {
      throw new BadRequestException('Room already exists');
    }

    const room = await prismaClient.rooms.create({
      data: {
        name: payload.roomName,
        adminId: user.id,
        slug: payload.roomName.toLowerCase().split(' ').join('-'),
      },
    });

    return {
      message: 'Room created',
      roomId: room.id,
      roomName: room.name,
    };
  }
}
