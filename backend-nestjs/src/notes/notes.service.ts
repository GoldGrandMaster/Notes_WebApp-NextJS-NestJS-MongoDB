import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDto } from 'src/dto/notes.dto';
import { Note, NoteDocument } from 'src/models/notes.models';

@Injectable()
export class notesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}
  Add(body: NoteDto) {
    return this.noteModel.create(body);
  }

  FindAll() {
    return this.noteModel.find();
  }

  FindOne(id: string) {
    return this.noteModel.findOne({ _id: id });
  }

  Update(id: string, body: NoteDto) {
    return this.noteModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );
  }

  Delete(id: string) {
    return this.noteModel.deleteOne({ _id: id });
  }

  Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullName: { $regex: key, $options: 'i' } },
            { note: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.noteModel.find(keyword);
  }
}
