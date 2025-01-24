import { GeneralModalProps } from "@/lib/definitions";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import React from "react";

const GeneralModal: React.FC<GeneralModalProps> = ({
  modalProps,
  modalHeader,
  modalFooter,
  children,
}) => {
  return (
    <Modal {...modalProps}>
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default GeneralModal;
