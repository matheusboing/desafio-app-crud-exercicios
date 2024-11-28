"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddExercise = ({ onAdd }: { onAdd: () => void }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newExerciseValue, setNewExerciseValue] = useState<string>("");
  const router = useRouter();

  const createNewExercise = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newExerciseValue }),
      });

      if (response.ok) {
        setNewExerciseValue("");
        setModalOpen(false);
        router.refresh();
        onAdd();
      } else {
        console.error("Failed to create exercise");
      }
    } catch (err) {
      console.error("Error creating exercise:", err);
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <Button onClick={() => setModalOpen(true)} className="btn btn-primary w-200">
          Adicionar um novo exercício <AiOutlinePlus className="ml-15" size={18} />
        </Button>

        <Button onClick={() => router.push('/workouts')} className="btn btn-primary w-200">
          Meus Treinos
        </Button>
      </div>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={createNewExercise}>
          <h3 className="font-bold text-lg">Adicionar um novo exercício</h3>
          <div className="modal-action">
            <input
              value={newExerciseValue}
              onChange={(e) => setNewExerciseValue(e.target.value)}
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
    </div>
  );
};

export default AddExercise;
