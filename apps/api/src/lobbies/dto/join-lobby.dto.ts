import { IsString, Length } from 'class-validator';

export class JoinLobbyDto {
  @IsString()
  @Length(5, 5)
  id: string;

  @IsString()
  @Length(1, 30)
  playerName: string;

  constructor(data: any) {
    this.id = data.id;
    this.playerName = data.playerName;
  }
}
