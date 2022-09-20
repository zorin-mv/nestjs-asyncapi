import { IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  userId: string;
}
