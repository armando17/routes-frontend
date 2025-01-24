import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { itemCartProps, ParamsInterface } from "./definitions";
dayjs.extend(utc);
dayjs.extend(timezone);
export const buildParamsUrl = (params: ParamsInterface) => {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", params.page.toString());
  }

  let where: string[] = [];

  if (params.where) {
    if (typeof params.where === "string") {
      params.where = JSON?.parse(params.where as any) || params.where;
    }

    if (!Array.isArray(params.where)) {
      params.where = [(params.where as any) || params.where];
    }

    if (Array.isArray(params.where)) {
      params.where.map(
        ({ key, value, valueType = "string", operator = "contains" }) => {
          operator = operator === "empty" ? "" : operator;
          if (valueType != "string" && operator == "contains") {
            operator = "";
          }
          if (valueType === "int") {
            where.push(`${key}: ${operator} int(${value})`);
          } else if (valueType === "float") {
            where.push(`${key}: ${operator} float(${value})`);
          } else if (valueType === "string") {
            where.push(`${key}: ${operator} ${value}`);
          } else if (valueType === "date") {
            where.push(`${key}: ${operator} date(${value})`);
          } else if (valueType === "array" && Array.isArray(value)) {
            where.push(`${key}: ${operator} array(${value.join(",")})`);
          } else if (valueType === "boolean") {
            where.push(`${key}: ${operator} boolean(${value})`);
          }
        },
      );
    }
  }

  if (where.length > 0) {
    let encodedWhere = encodeURIComponent(where.join(","));
    if (
      params.operator === "OR" ||
      params.operator === "AND" ||
      params.operator === "NOT"
    ) {
      encodedWhere = encodeURIComponent(`[${where.join(",")}]`);
    }
    let searchValue = encodedWhere;
    if (params.operator === "OR") {
      searchValue = `OR:${encodedWhere}`;
    } else if (params.operator === "AND") {
      searchValue = `AND:${encodedWhere}`;
    } else if (params.operator === "NOT") {
      searchValue = `NOT:${encodedWhere}`;
    }
    searchParams.set("where", searchValue);
  }

  if (Array.isArray(params.select)) {
    searchParams.set("select", params.select.join(","));
  }

  if (Array.isArray(params.include)) {
    searchParams.set("include", params.include.join(","));
  }

  // Esto se hace porque el backend no acepta ambos elementos al mismo tiempo, por lo que se debe eliminar el include si se usa el select
  if (Array.isArray(params.select) && Array.isArray(params.include)) {
    searchParams.delete("include");
  }

  if (Array.isArray(params.orderBy)) {
    searchParams.set("orderBy", params.orderBy.join(","));
  }
  if (typeof params.orderBy === "string") {
    searchParams.set("orderBy", params.orderBy);
  }

  if (params.perPage) {
    searchParams.set("perPage", params.perPage.toString());
  }
  return `?${searchParams.toString()}`;
};

export const getValidationError = ({ response }: { response: any }) => {
  const extractTextsFromDetails = () => {
    if (!response?.error) {
      return "Hubo un eror al procesar el request";
    }

    if (response.error.details && Array.isArray(response.error.details)) {
      return response.error.details
        .map((detail: any) => {
          return detail[Object.keys(detail)[0]][0];
        })
        .join(", ");
    } else if (response.error.message) {
      return response.error.message;
    } else {
      return "";
    }
  };
  return extractTextsFromDetails();
};

type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

export const dirtyValues = (
  dirtyFields: UnknownArrayOrObject | boolean | any,
  allValues: UnknownArrayOrObject | any,
): any => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      dirtyValues(dirtyFields[key], allValues[key]),
    ]),
  );
};

export const getSubTotal = (cart: itemCartProps[]) => {
  return cart
    .reduce((acumulador, cart) => {
      // Convierte el precio a número flotante y multiplica por la cantidad
      const subtotal =
        parseFloat(cart.product.price.toString()) * cart.quantity;
      return acumulador + subtotal;
    }, 0)
    .toFixed(2);
};

export const validateAlfaNumeric = (
  value: string,
  name: string,
  minLength: number = 3,
  maxLength: number = 25,
): string | undefined => {
  // Verificar si el valor está vacío o nulo
  if (!value) {
    return `El ${name} es requerido`;
  }

  // Verificar longitud máxima
  if (value.length > maxLength) {
    return `El ${name} debe tener como máximo ${maxLength} caracteres`;
  }

  // Verificar longitud mínima
  if (value.length < minLength) {
    return `El ${name} debe tener como mínimo ${minLength} caracteres`;
  }

  // Verificar caracteres válidos
  const isValidChar = (char: any) => /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(char);

  if (!Array.from(value).every(isValidChar)) {
    return `Solo se permiten letras, números, tildes y espacios en blanco`;
  }
  return undefined;
};

export const validateCategoryName = (
  value: string,
  name: string,
  minLength: number = 3,
  maxLength: number = 25,
): string | undefined => {
  // Verificar si el valor está vacío o nulo
  if (!value) {
    return `El ${name} es requerido`;
  }

  // Verificar longitud máxima
  if (value.length > maxLength) {
    return `El ${name} debe tener como máximo ${maxLength} caracteres`;
  }

  // Verificar longitud mínima
  if (value.length < minLength) {
    return `El ${name} debe tener como mínimo ${minLength} caracteres`;
  }

  // Verificar caracteres válidos
  const isValidChar = (char: any) =>
    /^[a-zA-Z0-9()-áéíóúÁÉÍÓÚñÑ\s]+$/.test(char);

  if (!Array.from(value).every(isValidChar)) {
    return `Solo se permiten letras, números, tildes y espacios en blanco`;
  }
  return undefined;
};

export const validateUrlSimple = (
  value: string,
  name: string,
  minLength: number = 3,
  maxLength: number = 25,
): string | undefined => {
  // Verificar si el valor está vacío o nulo
  if (!value) {
    return `El ${name} es requerido`;
  }

  // Verificar longitud máxima
  if (value.length > maxLength) {
    return `El ${name} debe tener como máximo ${maxLength} caracteres`;
  }

  // Verificar longitud mínima
  if (value.length < minLength) {
    return `El ${name} debe tener como mínimo ${minLength} caracteres`;
  }

  // Verificar caracteres válidos
  const isValidChar = (char: any) => /^[aa-zA-Z0-9-.]+$/.test(char);

  if (!Array.from(value).every(isValidChar)) {
    return `Solo se permiten letras, números, guiones y puntos, no espacios en blancos.`;
  }
  return undefined;
};

export const validateDescription = (
  value: string,
  name: string,
  minLength: number = 3,
  maxLength: number = 25,
): string | undefined => {
  // Verificar si el valor está vacío o nulo
  if (!value) {
    return `El ${name} es requerido`;
  }

  // Verificar longitud máxima
  if (value.length > maxLength) {
    return `El ${name} debe tener como máximo ${maxLength} caracteres`;
  }

  // Verificar longitud mínima
  if (value.length < minLength) {
    return `El ${name} debe tener como mínimo ${minLength} caracteres`;
  }

  // Verificar caracteres válidos
  const isValidChar = (char: any) =>
    /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ,.\s]+$/.test(char);

  if (!Array.from(value).every(isValidChar)) {
    return `Solo se permiten letras, números, tildes y espacios en blanco`;
  }
  return undefined;
};

export const validateMinMax = (
  value: string,
  name: string,
  minLength: number = 3,
  maxLength: number = 25,
): string | undefined => {
  // Verificar si el valor está vacío o nulo
  /* if (!value) {
    return `El ${name} es requerido`;
  } */
  console.log(value);
  // Verificar longitud máxima
  if (value && value.length > maxLength) {
    return `El ${name} debe tener como máximo ${maxLength} caracteres`;
  }

  // Verificar longitud mínima
  if (value.length < minLength) {
    return `El ${name} debe tener como mínimo ${minLength} caracteres`;
  }

  return undefined;
};



export const convertIntToFiveDigits = (num: number, numDigits = 5) => {
  return num.toString().padStart(numDigits, "0");
};

export const formatDate = (
  date: Date | string,
  customFormat: string = "YYYY-MM-DD",
  utc: boolean = false,
): string => {
  if (!date) {
    return "Fecha inválida";
  }
  if (utc) {
    //se requiere especificar utc para fechas tipo: 2024-10-19T00:00:00.000+00:00 | 2024-10-20T00:00:00.000+00:00, para que al momento
    //de establecer un formato se mantenga en 19/10/2024 | 20/10/2024 y no en 18/10/2024 | 19/10/2024
    return dayjs(date).utc().format(customFormat);
  } else {
    // Configurar la zona horaria de Panamá
    const panamaTimezone = "America/Panama";
    return dayjs(date).tz(panamaTimezone).format(customFormat);
  }
};

export const subtractYears = (year: number) => {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() - year,
    today.getMonth(),
    today.getDate(),
  );
  return targetDate;
};

export const findDifferences = (obj1: any, obj2: any) => {
  interface DifferenceEntry {
    value?: any;
    oldValue?: any;
    newValue?: any;
    type: string;
  }
  let differences: Record<string, DifferenceEntry> = {};

  for (const key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      differences[key] = { value: obj1[key], type: "added" };
    } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      differences[key] = obj1[key];
    }
  }

  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      differences[key] = { value: obj2[key], type: "removed" };
    }
  }

  return differences;
};

export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
export const filterChildrenByName = (data: any, searchTerm: string) => {
  return data.map((item: any) => {
    if (!item.children) {
      return item;
    }

    const filteredChildren = item.children.filter(
      (child: any) =>
        //child.name.toLowerCase().includes(searchTerm.toLowerCase()),
        removeAccents(child.name)
          .toLowerCase()
          .includes(removeAccents(searchTerm).toLowerCase()) ||
        removeAccents(item.name)
          .toLowerCase()
          .includes(removeAccents(searchTerm).toLowerCase()),
    );

    return {
      ...item,
      children:
        filteredChildren.length > 0
          ? filteredChildren.map(
              (child: any) => filterChildrenByName([child], searchTerm)[0],
            )
          : [],
    };
  });
};
