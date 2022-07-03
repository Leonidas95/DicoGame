import { IsString, Length } from 'class-validator';

export class JoinLobbyDto {
  @IsString()
  @Length(5, 5)
  id: string;

  @IsString()
  @Length(1, 30)
  displayName: string;

  constructor(data: any) {
    this.id = data.id;
    this.displayName = data.displayName;
  }
}
