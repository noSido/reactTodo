import { FormField } from "../FormField";
import { Button } from "../Button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import "./NoteForm.css";
import {useMutation} from "@tanstack/react-query";
import {createNote} from "../../api/Note.ts";
import {queryClient} from "../../api/queryClient.ts";
import {FetchUserView} from "../UserView/FetchUserView.tsx";


const CreateNoteSchema = z.object({
    title: z.string().min(10, "Длинна текста должна быть не менее 10 символов"),
    text: z.string().min(10, "Длинна текста должна быть не менее 10 символов")
})

type CreateNoteForm = z.infer<typeof CreateNoteSchema>;

export const NoteForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateNoteForm>({
        resolver: zodResolver(CreateNoteSchema)
    });

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"]});
            reset();
        }
    }, queryClient)

  return (
    <form className="note-form" onSubmit={handleSubmit(({title, text}) => {
        createNoteMutation.mutate({title, text})
    })}>
        <FetchUserView/>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")}/>
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")}/>
      </FormField>

      <Button isLoading={createNoteMutation.isPending} type="submit">Сохранить</Button>
    </form>
  );
};
