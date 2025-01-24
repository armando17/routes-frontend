"use client";
import GeneralButtons from "@/components/GeneralButtons";
import GeneralModal from "@/components/GeneralModal";
import { deletRoute, editRoute } from "@/lib/data";
import { dirtyValues, formatDate } from "@/lib/util";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import RouterForm from "./RouterForm";
export default function RouteFormEdit({
  item,
  drivers,
}: {
  item: any;
  drivers: any;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingFormDelete, setLoadingFormDelete] = useState(false);

  const date = formatDate(item?.date as Date, "YYYY-MM-DD");
  const itemData = {
    id: item.id,
    driverId: item?.driverId,
    date: parseDate(date),
    notes: item?.notes,
    orders: item?.orders,
  };

  const methods = useForm<any>({
    values: itemData,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoadingForm(true);
    const dirty: any = dirtyValues(methods.formState.dirtyFields, data);
    if (dirty.driverId) {
      dirty.driverId = parseInt(dirty.driverId);
    }
    if (dirty.date) {
      dirty.date = dirty.date.toDate(getLocalTimeZone());
    }
    if (dirty.orders) {
      const orders = data.orders.map((order: any) => {
        return {
          ...order,
          routeId: item.id,
        };
      });

      dirty.orders = orders;
    }
    const {
      errorStatus,
      errorMessage,
      data: dataResult,
    } = await editRoute(item.id, dirty);
    if (!errorStatus) {
      toast.success("La Ruta ha sido actualizada correctamente");
      router.push("/dashboard/routes");
    } else {
      toast.error(`${errorMessage}`);
    }

    setLoadingForm(false);
  };
  const handleClickDelete = async () => {
    setLoadingFormDelete(true);
    const { errorStatus, errorMessage } = await deletRoute(item.id);

    if (!errorStatus) {
      onOpenChange();
      toast.success("La Ruta se eliminó correctamente");
      router.push(`/dashboard/routes`);
    } else {
      toast.error(`${errorMessage || "Error al eliminar la ruta"}`);
    }
    setLoadingFormDelete(false);
  };
  return (
    <>
      <div className="flex flex-col gap-5">
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
                    isDisabled: loadingForm,
                  },
                },
                {
                  children: "Actualizar",
                  buttonProps: {
                    onPress: () => methods.handleSubmit(onSubmit)(),
                    type: "button",
                    color: "primary",
                    className: "text-white",
                    isDisabled: !methods.formState.isDirty || loadingForm,
                    isLoading: loadingForm,
                  },
                },
                {
                  children: "Cancelar",
                  buttonProps: {
                    type: "button",
                    isDisabled: !methods.formState.isDirty || loadingForm,
                    onPress: () => {
                      methods.reset && methods.reset();
                    },
                  },
                },
                {
                  children: "Eliminar",
                  buttonProps: {
                    type: "button",
                    isLoading: loadingFormDelete,
                    onPress: () => {
                      onOpen();
                    },
                    color: "danger",
                  },
                },
              ]}
            />
          </form>
        </FormProvider>
      </div>
      <GeneralModal
        modalProps={{
          isOpen: isOpen,
          onOpenChange: onOpenChange,
        }}
        modalHeader={<p className="flex items-center gap-2">Eliminar?</p>}
        modalFooter={
          <GeneralButtons
            buttons={[
              {
                children: "Cancelar",
                buttonProps: {
                  onPress: () => {
                    onOpenChange();
                  },
                  variant: "light",
                  color: "default",
                },
              },
              {
                children: "Confirmar",
                buttonProps: {
                  onPress: () => {
                    handleClickDelete();
                  },
                  color: "danger",
                  isLoading: loadingFormDelete,
                },
              },
            ]}
          />
        }
      >
        <p>
          Estás a punto de eliminar <b>{item.name}</b>
        </p>
      </GeneralModal>
    </>
  );
}
