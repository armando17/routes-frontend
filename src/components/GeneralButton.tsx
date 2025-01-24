"use client";
import { Button, ButtonProps, Tooltip, TooltipProps } from "@nextui-org/react";
import Link from "next/link";
interface GeneralButtonInterface {
  buttonProps: ButtonProps;
  toolTipProps?: TooltipProps;
  children?: React.ReactNode;
}
export default function GeneralButton({
  buttonProps,
  toolTipProps,
  children,
}: GeneralButtonInterface) {
  const getButton = (buttonProps: ButtonProps) => {
    return (
      <Button {...(buttonProps.href ? { as: Link } : {})} {...buttonProps}>
        {children}
      </Button>
    );
  };

  return (
    <>
      {toolTipProps ? (
        <Tooltip {...toolTipProps}>{getButton(buttonProps)}</Tooltip>
      ) : (
        getButton(buttonProps)
      )}
    </>
  );
}
