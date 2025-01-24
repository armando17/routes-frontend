import { CardProps, ModalProps, TableProps } from "@nextui-org/react";

export interface ColumnsInterface {
  name: string;
  uid?: string;
  variableType?: "string" | "int" | "float" | "date" | "boolean";
  selectOrder?: number;
  className?: React.ComponentProps<"div">["className"];
}
export interface TableInterface {
  columns: Array<ColumnsInterface>;
  params?: ParamsInterface;
}
export interface ParamsInterface {
  page?: number;
  where?:
    | {
        key: string;
        value: string | string[];
        valueType?: "int" | "float" | "string" | "date" | "array" | "boolean";
        operator?:
          | ""
          | "empty"
          | "in"
          | "lt"
          | "lte"
          | "gt"
          | "gte"
          | "equals"
          | "not"
          | "contains"
          | "startsWith"
          | "endsWith"
          | "every"
          | "some"
          | "none"
          | "has";
      }[]
    | {
        key: string;
        value: string | string[];
        valueType?: "int" | "float" | "string" | "date" | "array" | "boolean";
        contains?: boolean;
        operator?:
          | ""
          | "empty"
          | "in"
          | "lt"
          | "lte"
          | "gt"
          | "gte"
          | "equals"
          | "not"
          | "contains"
          | "startsWith"
          | "endsWith"
          | "every"
          | "some"
          | "none"
          | "has";
      }
    | null;
  perPage?: number;
  orderBy?: `${string}: ${"asc" | "desc"}` | `${string}: ${"asc" | "desc"}`[];
  operator?: "OR" | "AND" | "NOT" | "in";
  select?: `${string}`[];
  include?: `${string}`[];
  viewport?: "desktop" | "mobile";
}
export enum Roles {
  admin = "admin",
  product = "product",
  tech = "tech",
  tuuriops = "tuuriops",
  growth = "growth",
  finance = "finance",
}
export interface CountryInterface {
  id: string;
  name: string;
  iso_code: string;
  sub_group_detail: {
    type: string;
    total: number;
  };
}
export interface AdminInterface {
  id: string;
  first_name: string;
  last_name: string;
  type_admin: number;
  password: string;
  email: string;
  roles: Roles | string[];
  country: CountryInterface;
  status: number;
  creator: any;
}

export interface PaginationInterface {
  total: number;
  totalPages: number;
  lastPage: number;
  currentPage: number;
  perPage: number | null;
  prev: number | null;
  next: number | null;
}
export interface ApiResponse<T> {
  data?: T;
  errorStatus?: number;
  errorMessage?: String;
  meta?: PaginationInterface;
}

export interface FieldProps {
  [key: string]: any | Date;
}

export interface ColumnPros {
  label: string;
  uid: string;
}
export interface GeneralTableProps {
  tableProps?: TableProps;
  columns: ColumnPros[];
  items: FieldProps[];
  renderCell: (item: FieldProps, columnKey: string | number) => any;
  meta?: PaginationInterface;
}

export interface GeneralListProps {
  deleteItem?: (item: any) => any;
  editItem?: (item: any) => any;
  data?: any;
  columns?: any;
  meta?: PaginationInterface;
}
export interface FormState {
  isSubmitting: boolean;
  errors: FieldProps;
  isDirty: boolean;
  dirtyFields?: any;
}
export interface BasicFormProps {
  formState: FormState;
  control?: any;
  register?: any;
  watch?: any;
  setValue?: any;
  getValues?: any;
  onSubmit?: (handleSubmit: any) => void;
  dirtyFields?: any;
  titleSubmitButton?: string;
  onCancel?: () => void;
  fields?: any;
  loadingForm?: boolean;
  isSubmitting?: boolean;
  reset?: () => void;
}

export const inputFormProps = (
  fieldName: string,
  errors: FieldProps,
  placeholder: string = " "
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
export interface GeneralCardImageProps {
  url: string;
  order?: number;
  confirmDeleteItem?: (url: string) => void;
  viewImage?: (url: string) => void;
  className?: string;
  cardFooter?: React.ReactNode;
}

export interface GeneralModalProps {
  modalProps?: Omit<ModalProps, "children">;
  modalHeader: React.ReactNode;
  modalFooter?: React.ReactNode;
  children: React.ReactNode;
}
export interface PageInterface {
  searchParams: ParamsInterface;
}

export interface GeneralCardProps {
  cardProps?: CardProps;
  cardHeader: React.ReactNode;
  cardFooter?: React.ReactNode;
  children: React.ReactNode;
}

export interface itemCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    base_price: number;
    files: any[];
    stocks: any[];
    authorId: string;
  };
  quantity: number;
  color: string;
  size: string;
  author: string;
}


export interface ItemInterface {
  id: string;
  name: string;
}

export interface breadcrumbItemProps {
  href: string;
  label: string;
}

export interface GeneralPhotoSliderProps {
  images: string[];
  index: number;
  setIndex: (index: number) => void;
  visible: boolean;
  onClose: () => void;
}

export interface SearchInterface {
  placeholder: string;
  columns: Array<ColumnsInterface>;
}