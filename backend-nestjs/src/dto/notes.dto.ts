import { IsNotEmpty } from 'class-validator';

export class NoteDto {
  
  @IsNotEmpty()
  fullName: string;
}
