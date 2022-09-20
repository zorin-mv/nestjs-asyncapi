import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UserIdDto } from 'src/dto/user-id.dto';

export class GameSessionRealtimeDto extends UserIdDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  gameSessionId: string;
}
