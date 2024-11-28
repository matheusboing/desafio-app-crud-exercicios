"use client";

import { IExercise } from "../types/exercises";
import { FormEventHandler, use, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface ExerciseProps {
  exercise: IExercise;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<string>(exercise.text);

  const handleSubmitEditExercise: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
        await fetch(`/api/exercises/${exercise.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: exerciseToEdit }),
      });

      setOpenModalEdit(false);
      // Router.reload();
      // router.refresh();
      window.location.reload()
    } catch (err) {
      return;
    }
  };

  const handleDeleteExercise = async (id: string) => {
    try {
        await fetch(`/api/exercises/${id}`, {
        method: "DELETE",
      });
      setOpenModalDeleted(false);
      // Router.reload();
      // router.refresh();
      window.location.reload()
      }
    catch (err) {
      return;
    }
  };

  return (
    <tr key={exercise.id}>
      <td className="w-full">{exercise.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditExercise}>
            <h3 className="font-bold text-lg">Editar exercício</h3>
            <div className="modal-action">
              <input
                value={exerciseToEdit}
                onChange={(e) => setExerciseToEdit(e.target.value)}
                type="text"
                placeholder="Digite aqui"
                className="input input-bordered w-full"
                />
              <button type="submit" className="btn">
                Enviar
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Você tem certeza que deseja excluir este exercício?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteExercise(exercise.id)}
              className="btn"
            >
              Sim
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Exercise;
