import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Exercício inválido" });
  }

  if (req.method === "DELETE") {
    try {
      await prisma.exercise.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: "Falha ao excluir o exercício" });
    }
  }

  if (req.method === "PUT") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "É necessário informar um título" });
    }

    try {
      const updatedExercise = await prisma.exercise.update({
        where: { id },
        data: { text },
      });

      return res.status(200).json(updatedExercise);
    } catch (error) {
      return res.status(500).json({ error: "Falha ao atualizar o exercício" });
    }
  }


  res.setHeader("Allow", ["DELETE", "UPDATE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
