"use server"
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const workouts = await prisma.workout.findMany({
        include: {
          days: {
            select: {
              name: true,
            },
          },
          exercises: {
            select: {
              text: true,
            },
          },
        },
      });
      return res.status(200).json(workouts);
    }

    if (req.method === "POST") {
      const { text, days, exercises } = req.body;
    
      try {
    
        const exerciseIds = exercises
          .filter((exercise) => exercise && exercise.id)
          .map((exercise) => exercise.id);
    
        if (exerciseIds.length === 0) {
          return res.status(400).json({ error: "É necessário pelo menos vincular um exercício ao treino" });
        }
    
        const newWorkout = await prisma.workout.create({
          data: {
            text,
            days: {
              connectOrCreate: days.map((day) => ({
                where: { name: day },
                create: { name: day },
              })),
            },
          },
        });

        await prisma.exercise.updateMany({
          where: {
            id: { in: exerciseIds },
          },
          data: {
            workoutId: newWorkout.id,
          },
        });
    
        return res.status(201).json(newWorkout);
      } catch (error) {
        console.error("Error creating workout:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
    

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
