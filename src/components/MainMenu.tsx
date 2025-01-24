"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";

import { signOut, useSession } from "next-auth/react";
//import {AcmeLogo} from "./AcmeLogo.jsx";
import Link from "next/link";
import { useState } from "react";
import GeneralButtons from "./GeneralButtons";
import GeneralModal from "./GeneralModal";
import { signOutIcon } from "./Icons";
export default function MainMenu({ username }: { username?: string }) {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onOpenChange: onOpenChangeCart,
  } = useDisclosure();
  const [loadingFormDelete, setLoadingFormDelete] = useState(false);
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const handleClickSignOut = async () => {
    setLoadingFormDelete(true);
    signOut();
    setLoadingFormDelete(false);
  };

  return (
    <>
      <Navbar className="w-full" isBordered>
        <NavbarBrand>
          <Link color="foreground" href={"/dashboard"}>
            PRUEBA TÉCNICA
          </Link>
        </NavbarBrand>
        <NavbarContent
          className="hidden gap-4 sm:flex"
          justify="center"
        ></NavbarContent>
        <NavbarContent justify="end">
          {session ? (
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={session.user?.name as string}
                    size="sm"
                    src={session.user?.image as string}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile_detail" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session.user?.email}</p>
                  </DropdownItem>
                 

                  

                  <DropdownItem
                    key="logout"
                    onClick={() => onOpen()}
                    color="danger"
                    startContent={signOutIcon()}
                  >
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          ) : (
            <>
              
            </>
          )}

          
        </NavbarContent>
      </Navbar>

      <GeneralModal
        modalProps={{
          isOpen: isOpen,
          onOpenChange: onOpenChange,
        }}
        modalHeader={<p className="flex items-center gap-2">Cerrar Sesión?</p>}
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
                    handleClickSignOut();
                  },
                  color: "danger",
                  isLoading: loadingFormDelete,
                },
              },
            ]}
          />
        }
      >
        Estas seguro de cerrar la sesión?
      </GeneralModal>
    </>
  );
}
