"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import GeneralButtons from "./GeneralButtons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { googleIcon } from "./Icons";

export default function LoginForm() {
  const router = useRouter();
  const {
    control,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm<any>({
    values: {
      email: "armank.17@gmail.com",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    const responseNextAuth = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      toast.error(responseNextAuth?.error);
      return;
    }

    router.push("/dashboard");
  };

  interface FieldProps {
    [key: string]: any | Date;
  }
  const inputFormProps = (
    fieldName: string,
    errors: FieldProps,
    placeholder: string = " ",
  ) => {
    if (!errors || !errors.hasOwnProperty(fieldName))
      return {
        //labelPlacement: "outside",
        placeholder: placeholder,
        classNames: {
          label: ["uppercase"],
        },
      };
    return {
      //labelPlacement: "outside",
      placeholder: placeholder,
      classNames: {
        label: ["uppercase"],
      },
      isInvalid: !!errors[fieldName]?.message,
      errorMessage: errors[fieldName]?.message,
    };
  };

  return (
    <Card className="m-auto mt-10 max-w-[400px]">
      <CardHeader className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Inicia sessión con tu cuenta</h1>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "El email es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Por favor ingrese un email válido",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Correo"
                value={value}
                onChange={onChange}
                {...inputFormProps("email", errors)}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "La contraseña es requerida",
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                type="password"
                label="Contraseña"
                value={value}
                onChange={onChange}
                {...inputFormProps("password", errors)}
              />
            )}
          />

          <CardFooter className="flex flex-col gap-3">
            <p>Acceso Prueba:</p>
            <p>armank.17@gmail.com / 123456</p>
            <GeneralButtons
              className="flex items-center justify-end gap-2"
              buttons={[
                {
                  children: "Login",
                  buttonProps: {
                    type: "submit",
                    color: "primary",

                    isDisabled: !isDirty || isSubmitting,
                    isLoading: isSubmitting,
                  },
                },
                {
                  children: "Cancelar",
                  buttonProps: {
                    type: "button",
                    isDisabled: !isDirty || isSubmitting,
                    onClick: () => {
                      reset && reset();
                    },
                  },
                },
              ]}
            />
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
}
