import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getValidationError = ({ response }: { response: any }) => {
  const extractTextsFromDetails = () => {
    if (!response?.error) {
      return "Hubo un error al procesar el request";
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