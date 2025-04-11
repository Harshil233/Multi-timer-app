import React from "react";
import { useTimers } from "../contexts/TimerContext";
import CompletionModal from "./modals/CompletionModal";
import HalfwayModal from "./modals/HalfwayModal";

export default function ModalManager() {
  const {
    modalData,
    setModalData,
    halfwayModalData,
    halfwayProgressValue,
    closeHalfwayModal,
  } = useTimers();

  return (
    <>
      {modalData && (
        <CompletionModal
          name={modalData.name}
          onClose={() => setModalData(null)}
        />
      )}
      {halfwayModalData && (
        <HalfwayModal
          name={halfwayModalData.name}
          progress={halfwayProgressValue}
          onClose={closeHalfwayModal}
        />
      )}
    </>
  );
}
