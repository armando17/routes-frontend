"use client";
import { ButtonProps, TooltipProps } from "@nextui-org/react";
import GeneralButton from "./GeneralButton";

interface GeneralButtonInterface {
  buttonProps: ButtonProps;
  toolTipProps?: TooltipProps;
  children?: React.ReactNode;
}
export default function GeneralButtons({
  className = "flex justify-end items-center gap-2",
  buttons,
}: {
  className?: string;
  buttons: Array<GeneralButtonInterface>;
}) {
  return (
    <div className={className}>
      {buttons.map((button: GeneralButtonInterface, index: number) => (
        <GeneralButton
          key={index}
          buttonProps={button.buttonProps}
          toolTipProps={button.toolTipProps}
        >
          {button.children}
        </GeneralButton>
      ))}
    </div>
  );
}
