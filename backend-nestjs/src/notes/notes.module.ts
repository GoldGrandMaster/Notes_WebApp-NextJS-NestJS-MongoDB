import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/models/notes.models';
import { notesController } from './notes.controller';
import { notesService } from './notes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [notesController],
  providers: [notesService],
})
export class NotesModule {}
