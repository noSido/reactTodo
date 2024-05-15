import {useQuery} from "@tanstack/react-query";
import {fetchMe} from "../../api/User.ts";
import {queryClient} from "../../api/queryClient.ts";
import {Loader} from "../Loader";
import {UserView} from "./UserView.tsx";


export const FetchUserView = () => {
    const userQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
        retry: 0
    }, queryClient);

    switch (userQuery.status) {
        case "pending":
            return <Loader/>
        case "success":
            return <UserView user={userQuery.data}/>
        case "error":
            return <div>
                <span>
                    Произошла ошибка
                </span>
                <button onClick={() => userQuery.refetch()}></button>
            </div>
    }
}