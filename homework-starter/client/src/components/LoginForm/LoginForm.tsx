import {useMutation} from "@tanstack/react-query"
import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import {login} from "../../api/User.ts";
import {FC} from "react";
import {queryClient} from "../../api/queryClient.ts"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const CreateLoginSchema = z.object({
    email: z.string().refine(value => /^\S+@\S+\.\S+$/.test(value), {
        message: "Проверьте правильность написания email. Корректный формат электронной почты: например, test@mail.com."
    }),
    password: z.string().min(8,"Проверьте правильность написания пароля. Длинна пароля должна быть не менее 8 символов")
})

type CreateLoginForm = z.infer<typeof CreateLoginSchema>;

export const LoginForm: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateLoginForm>({
        resolver: zodResolver(CreateLoginSchema)
    });


    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess() {
          queryClient.invalidateQueries({queryKey:["users", "me"]})
        },
    }, queryClient);

  return (
    <form className="login-form" onSubmit={handleSubmit(({email, password}) => {
        loginMutation.mutate({email, password})
    })}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
        type="text"
        {...register("email")}/>
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
            type="password"
            {...register("password")}
        />
      </FormField>

      <Button isLoading={loginMutation.isPending} type="submit">Войти</Button>
    </form>
  );
};
