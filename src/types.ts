export interface NoteType {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  editorState: string | null;
  userId: string;
}
