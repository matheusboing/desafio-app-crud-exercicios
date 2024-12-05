"use client";

import { IExercise } from "../types/exercises";
import React from "react";
import Exercise from "./Exercise";

interface ExerciseListProps {
  exercises: IExercise[];
}

const ExercisesList: React.FC<ExerciseListProps & { query: string }> = ({ exercises, query }) =>{
  const keys = ['text']

  const search = (data: IExercise[]) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filteredExercises = search(exercises);

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
          <th>Exercícios</th>
          <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredExercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
