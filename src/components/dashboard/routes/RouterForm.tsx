"use client";
import { inputFormProps } from "@/lib/definitions";
import { validateAlfaNumeric } from "@/lib/util";
import {
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const RouterForm: React.FC<any> = ({ drivers }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "orders",
  });

  return (
    <>
      <Controller
        name="id"
        control={control}
        rules={{
          validate: (value) => validateAlfaNumeric(value, "nombre", 3, 25),
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Id"
            labelPlacement="outside"
            color="default"
            value={value}
            readOnly={true}
            onChange={onChange}
            {...inputFormProps("id", errors)}
            variant="faded"
          />
        )}
      />

      <Controller
        name="driverId"
        control={control}
        rules={{ required: "El Conductor es requerido" }}
        render={({ field: { value, onChange } }) => (
          <Select
            items={drivers ?? []}
            value={value}
            onChange={onChange}
            label="Conductor"
            labelPlacement="outside"
            defaultSelectedKeys={[value?.toString() ?? ""]}
            selectedKeys={[value?.toString() ?? ""]}
            {...inputFormProps("driverId", errors)}
            variant="bordered"
          >
            {(item: any) => (
              <SelectItem key={item.id} value={item?.id}>
                {item?.name}
              </SelectItem>
            )}
          </Select>
        )}
      />

      <Controller
        name="date"
        control={control}
        rules={{
          required: "Campo requerido",
        }}
        render={({ field: { onChange, value, name } }) => {
          return (
            <DatePicker
              name={name}
              onChange={onChange}
              value={value}
              //isRequired
              /* minValue={
                  today(getLocalTimeZone()).subtract({ years: 100 }) as any
                }
                maxValue={
                  today(getLocalTimeZone()).subtract({ years: 18 }) as any
                } */

              showMonthAndYearPickers
              label="FECHA PROGRAMADA"
              labelPlacement="outside"
              {...inputFormProps("date", errors)}
              variant="bordered"
            />
          );
        }}
      />

      <Controller
        name="notes"
        control={control}
        rules={{
          maxLength: { value: 100, message: "Máximo 400 caracteres" },
        }}
        render={({ field: { value, onChange } }) => (
          <Textarea
            label="Notas"
            labelPlacement="outside"
            variant="bordered"
            value={value}
            onChange={onChange}
            {...inputFormProps("notes", errors)}
            description="Máximo 100 caracteres."
          />
        )}
      />

      <div className="flex flex-col gap-4">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>ORDEN</TableColumn>
            <TableColumn>VALOR</TableColumn>
            <TableColumn>PRIORITARIO</TableColumn>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Controller
                    key={index}
                    name={`orders.${index}.id`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        readOnly={true}
                        variant="underlined"
                        onChange={onChange}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    key={index}
                    name={`orders.${index}.value`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        readOnly={true}
                        variant="underlined"
                        onChange={onChange}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    key={index}
                    name={`orders.${index}.priority`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        onChange={onChange}
                        defaultSelected={value}
                      ></Checkbox>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default RouterForm;
