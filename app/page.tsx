"use client";

import { useEffect, useState } from "react";
import AddExercise from "@/components/AddExercise";
import ExercisesList from "@/components/ExercisesList";

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/exercises", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Meus exercícios</h1>
        <AddExercise onAdd={fetchExercises} />
      </div>
      <ExercisesList exercises={exercises} />
    </main>
  );
}
