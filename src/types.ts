export interface NoteType {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  editorState: string | null;
  userId: string;
}

export type EventCardProps = {
  userId: string;
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  durationInMinutes: number;
  isActive: boolean;
};
