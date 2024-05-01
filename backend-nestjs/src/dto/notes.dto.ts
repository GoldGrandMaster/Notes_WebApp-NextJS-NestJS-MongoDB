import { IsNotEmpty } from 'class-validator';

export class NoteDto {
  
  @IsNotEmpty()
  fullname: string;
}
