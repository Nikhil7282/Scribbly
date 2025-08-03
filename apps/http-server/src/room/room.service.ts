import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../auth/auth.controller';
import { prismaClient } from '@repo/db/client';

@Injectable()
export class RoomService {
  async createRoom(user: User) {
    const now = new Date();
    const roomName = user.username + '-' + now.toISOString();

    const room = await prismaClient.rooms.create({
      data: {
        name: roomName,
        adminId: user.id,
        slug: roomName.toLowerCase().split(' ').join('-'),
      },
    });

    return {
      message: 'Live Session Started',
      roomId: room.id,
      roomName: room.name,
    };
  }

  async getAllShapesInRoom(user: User, roomId: string) {
    const room = await prismaClient.rooms.findFirst({
      where: { adminId: user.id },
    });

    if (!room) {
      throw new BadRequestException('Room not found');
    }

    const shapes = await prismaClient.chats.findMany({
      where: { roomId },
    });

    return shapes;
  }
}
