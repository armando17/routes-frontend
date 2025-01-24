"use client";
import GeneralButtons from "@/components/GeneralButtons";
import { createRoute, getRoute, getRouteExternal } from "@/lib/data";
import { inputFormProps } from "@/lib/definitions";
import { formatDate } from "@/lib/util";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import RouterForm from "./RouterForm";

export default function RouterFormCreate({ drivers }: { drivers: any }) {
  const router = useRouter();
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadedExternal, setLoadedExternal] = useState(false);
  const [loadingExternal, setLoadingExternal] = useState(false);

  const methods = useForm<any>({
    values: {
      driverId: "",
      date: null,
      notes: "",
      orders: [],
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const {
    control: control2,
    reset: reset2,
    formState: formState2,
    formState: { isDirty: isDirty2, errors: errors2 },
    handleSubmit: handleSubmit2,
    setValue: setValue2,
  } = useForm<any>({
    values: {
      idSearch: "",
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoadingForm(true);
    data.id = parseInt(data.id);
    data.driverId = parseInt(data.driverId);
    data.date = data.date.toDate(getLocalTimeZone());
    if (!data.notes) {
      data.notes = "";
    }

    const orders = data.orders.map((order: any) => {
      return {
        ...order,
        routeId: data.id,
      };
    });

    data.orders = orders;
    const { errorStatus, errorMessage } = await createRoute(data);
    if (errorStatus) {
      toast.error(`${errorMessage}`);
    } else {
      toast.success("La Ruta ha sido creada correctamente");
    }

    setLoadingForm(false);
    methods.reset({}, { keepDefaultValues: true });
    router.push("/dashboard/routes");
  };
  const onSubmitSearchExternal: SubmitHandler<any> = async (dataSubmit) => {
    setLoadingExternal(true);
    const { data } = await getRoute(dataSubmit.idSearch);

    if (data) {
      router.push(`/dashboard/routes/${data.id}/edit`);
    }
    const resultExternal: any = await getRouteExternal(dataSubmit.idSearch);
    if (resultExternal?.errorMessage) {
      toast.error(`${resultExternal.errorMessage}`);
      setLoadingExternal(false);
      return;
    }

    methods.setValue("id", resultExternal.id);
    methods.setValue("driverId", resultExternal.driverId.toString());
    const date = formatDate(resultExternal.date);
    methods.setValue("date", parseDate(date));
    methods.setValue("notes", resultExternal.notes);
    methods.setValue("orders", resultExternal.orders);
    setLoadedExternal(true);
    setLoadingExternal(false);
  };
  return (
    <>
      <div className="flex flex-row gap-5">
        <Controller
          name="idSearch"
          control={control2}
          rules={{
            required: "El Id es requerido",
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              //label="Id"
              type="number"
              value={value}
              onChange={onChange}
              {...inputFormProps("idSearch", errors2, "Número de la Ruta...")}
              variant="bordered"
            />
          )}
        />
        <GeneralButtons
          buttons={[
            {
              children: "Cargar Ruta",
              buttonProps: {
                type: "button",
                onPress: () => handleSubmit2(onSubmitSearchExternal)(),
                color: "primary",
                isLoading: loadingExternal,
              },
            },
          ]}
        />
      </div>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-5">
          <RouterForm drivers={drivers} />
          <GeneralButtons
            buttons={[
              {
                children: "Volver",
                buttonProps: {
                  href: `/dashboard/routes`,

                  color: "default",
                },
              },
              {
                children: "Guardar",
                buttonProps: {
                  type: "button",
                  onPress: () => methods.handleSubmit(onSubmit)(),
                  color: "primary",
                  isDisabled:
                    (!methods.formState.isDirty || loadingForm) &&
                    !loadedExternal,
                  isLoading: loadingForm,
                },
              },
              {
                children: "Cancelar",
                buttonProps: {
                  type: "button",
                  isDisabled:
                    (!methods.formState.isDirty || loadingForm) &&
                    !loadedExternal,
                  onPress: () => {
                    methods.reset && methods.reset();
                  },
                },
              },
            ]}
          />
        </form>
      </FormProvider>
    </>
  );
}
