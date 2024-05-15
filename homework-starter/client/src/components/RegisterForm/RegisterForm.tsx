import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {registerUser} from "../../api/User.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const CreateRegisterSchema = z.object({
    email: z.string().refine(value => /^\S+@\S+\.\S+$/.test(value), {
        message: "Поле должно содержать корректный формат электронной почты, например test@mail.com"
    }),
    username:z.string().min(5, "Длинна имени должна быть не менее 5 символов"),
    password: z.string().min(8,"Длинна пароля должна быть не менее 8 символов")
})

type CreateRegisterForm = z.infer<typeof CreateRegisterSchema>;

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateRegisterForm>({
        resolver: zodResolver(CreateRegisterSchema)
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess() {
            reset();
            alert("Регистрация успешно завершена!")
        }
    }, queryClient)


  return (
    <form className="register-form" onSubmit={handleSubmit(({email, username, password}) => {
        registerMutation.mutate({email, username, password})
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input type="text" {...register("username")} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="text" {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>


      <Button isLoading={registerMutation.isPending} type="submit">Зарегистрироваться</Button>
    </form>
  );
};
