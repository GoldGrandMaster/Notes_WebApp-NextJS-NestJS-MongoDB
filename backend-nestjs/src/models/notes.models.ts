import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  note: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
