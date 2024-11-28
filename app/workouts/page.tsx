"use client";
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Workouts = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newWorkout, setNewWorkout] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);


  const router = useRouter();

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/exercises', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }

      const data = await response.json();
      setExercises(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/workouts', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }

      const data = await response.json();
      setWorkouts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewWorkout = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newWorkout, days: selectedDays, exercises: selectedExercises }),
      });
  
      if (response.ok) {
        setNewWorkout('');
        setSelectedDays([]);
        setSelectedExercises([]);
        setModalOpen(false);
        fetchWorkouts();
      } else {
        console.error('Failed to create workout');
      }
    } catch (err) {
      console.error('Error creating workout:', err);
    }
  };
  

  useEffect(() => {
    fetchExercises();
    fetchWorkouts();
  }, []);

  return (
    <div>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Meus treinos</h1>
        </div>

        <div className="flex flex-row gap-4 mb-10 justify-between">
          <Button onClick={() => setModalOpen(true)} className="btn btn-primary w-200">
            Adicionar um novo treino <AiOutlinePlus className="ml-15" size={18} />
          </Button>

          <Button onClick={() => router.push('/') } className="btn btn-primary w200">
            Meus Exercícios
          </Button>
        </div>

        <div className="overflow-x-auto max-w-full px-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Treino</th>
              <th className="border border-gray-300 px-4 py-2">Exercícios</th>
              <th className="border border-gray-300 px-4 py-2">Dias da semana</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index} className="border-t">
                <td className="border border-gray-300 px-4 py-2">{workout.text}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {workout.exercises.length > 0
                    ? workout.exercises.map((exercise) => exercise.text).join(', ')
                    : 'Sem exercícios selecionados'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {workout.days.length > 0
                    ? workout.days.map((day) => day.name).join(', ')
                    : 'Sem dias selecionados'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </main>

      <div className="flex flex-col gap-5">
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={createNewWorkout}>
            <h3 className="font-bold text-lg">Adicionar um novo treino</h3>
            <div className="modal-action flex flex-col gap-2">
              <input
                value={newWorkout}
                onChange={(e) => setNewWorkout(e.target.value)}
                type="text"
                placeholder="Digite o nome do treino"
                className="input input-bordered w-full"
              />
              <div className="flex flex-row gap-5">
              <select
                onChange={(e) => {
                  const selectedExercise = exercises.find((ex) => ex.text === e.target.value);
                  if (!selectedExercise) return;

                  setSelectedExercises((prev) =>
                    prev.some((ex) => ex.id === selectedExercise.id) ? prev : [...prev, selectedExercise]
                  );
                }}
              >
                <option disabled>Selecione o exercício</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.text}>
                    {exercise.text}
                  </option>
                ))}
              </select>
                <div className="flex flex-col gap-2">
                  <h4>Exercícios selecionados:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {selectedExercises.map((exercise, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-primary px-3 py-1 rounded-md text-sm bold"
                      >
                        {exercise.text}
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() =>
                            setSelectedExercises((prev) =>
                              prev.filter((ex) => ex.id !== exercise.id)
                            )
                          }
                        >
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <select
                  className="select select-bordered w-48"
                  onChange={(e) => {
                    const selectedDay = e.target.value;
                    setSelectedDays((prev) =>
                      prev.includes(selectedDay) ? prev : [...prev, selectedDay]
                    );
                  }}
                >
                  <option disabled>Selecione o dia da semana</option>
                  <option>Segunda</option>
                  <option>Terça</option>
                  <option>Quarta</option>
                  <option>Quinta</option>
                  <option>Sexta</option>
                  <option>Sábado</option>
                  <option>Domingo</option>
                </select>

                <div className="flex flex-col gap-2">
                  <h4>Dias selecionados:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {selectedDays.map((day, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-primary px-3 py-1 rounded-md text-sm bold"
                      >
                        {day}
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() =>
                            setSelectedDays((prev) => prev.filter((d) => d !== day))
                          }
                        >
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button type="submit" className="btn w-full">
                Enviar
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Workouts;
