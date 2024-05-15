import {useQuery} from "@tanstack/react-query";
import {fetchMe} from "../../api/User.ts";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {queryClient} from "../../api/queryClient.ts";
import {NoteForm} from "../NoteForm";
import {LogoutButton} from "../LogoutButton";
import {FetchNoteListView} from "../NotesListView/FetchNoteListView.tsx";

export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
        retry: 0
    },queryClient);

    switch (meQuery.status) {
        case "pending":
            return <Loader />
        case 'error':
            return <AuthForm/>
        case 'success':
            return (<>
                <NoteForm/>

                <FetchNoteListView/>

                <LogoutButton/>
            </>);
    }
}

