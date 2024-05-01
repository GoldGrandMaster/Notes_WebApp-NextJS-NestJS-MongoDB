export  interface UserModel{
    _id:string,
    fullname:string,
}
export  interface NoteModel{
    _id: string,
    fullname:string,
    note:string,
    deleteNote:(id: string)=> void;
}
export interface NoteAddModel{
    fullname:string,
    note:string
}