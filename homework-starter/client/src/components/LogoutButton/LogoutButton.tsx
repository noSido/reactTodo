import { Button } from "../Button";
import "./LogoutButton.css";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {FC} from "react";
import {logout} from "../../api/User.ts";


export const LogoutButton:FC = () => {

    const logoutMutation = useMutation({

        mutationFn: () => logout(),
        onSuccess() {
            queryClient.invalidateQueries();
        },
    }, queryClient);

  return (
    <div className="logout-button" >
        {<Button kind="secondary" onClick={() => logoutMutation.mutate()}>Выйти</Button>}
    </div>
  );
};
