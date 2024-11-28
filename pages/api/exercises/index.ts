"use server"
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const exercises = await prisma.exercise.findMany();
      return res.status(200).json(exercises);
    }

    if (req.method === "POST") {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Conteúdo é obrigatório" });
      }


      const newExercise = await prisma.exercise.create({
        data: {
          text: content,
          createdAt: new Date(),
        },
      });

      return res.status(201).json(newExercise);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
