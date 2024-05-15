import {fetchNoteList} from "../../api/Note.ts";
import {Loader} from "../Loader";
import {NotesListView} from "./NotesListView.tsx";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";

export const FetchNoteListView = () => {

    const noteListQuery = useQuery({
        queryFn:() => fetchNoteList(),
        queryKey: ["notes"],
        retry: 0,
    }, queryClient)

    switch (noteListQuery.status) {
        case "pending":
            return <Loader/>
        case "success":
            return <NotesListView notesList={noteListQuery.data.list} />
        case "error":
            return <div>
                <span>Произошла ошибка</span>

                <button onClick={() => noteListQuery.refetch()}>Повторить запрос</button>
            </div>
    }
}