import "./NotesListView.css";
import { NoteView } from "../NoteView";

import {FC} from "react";
import {NoteList} from "../../api/Note.ts";

export interface NotesListViewProps {
    notesList: NoteList
}


export const NotesListView: FC<NotesListViewProps> = ({notesList}) => {
  return (
    <ul className="note-list-view">
        {notesList.map((note) => (
            <li key={note.id}>
                <NoteView  note={note}/>
            </li>
        ))}
    </ul>
  );
};
