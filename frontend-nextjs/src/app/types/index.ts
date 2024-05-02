export  interface UserModel{
    _id:string,
    fullName:string,
}
export  interface NoteModel{
    _id: string,
    fullName:string,
    note:string,
    deleteNote:(id: string)=> void;
}
export interface NoteAddModel{
    fullName:string,
    note:string
}