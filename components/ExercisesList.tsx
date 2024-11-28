"use client";

import { IExercise } from "../types/exercises";
import React from "react";
import Exercise from "./Exercise";

interface ExerciseListProps {
  exercises: IExercise[];
}

const ExercisesList: React.FC<ExerciseListProps> = ({ exercises }) => {
  
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
          {exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
