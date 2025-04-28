import { Router, type Request, type Response } from "express";
import { PositionService } from "../services/positition.service";
import positionRepository from "../repositories/position.repository";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const positionService = new PositionService(positionRepository);
  const positions = positionService.getAllPositions();

  res.status(200).json({
    code: 200,
    data: positions,
  });
});

router.get("/search", async (req: Request, res: Response) => {
  const { text } = req.query;
  const positionService = new PositionService(positionRepository);
  const positions = await positionService.searchPositionByName(text as string);

  res.status(200).json({
    code: 200,
    data: positions,
  });
});

router.post("/", async (req: Request, res: Response) => {
  const positionService = new PositionService(positionRepository);

  const position = await positionService.createPosition(req.body);

  res.status(201).json({
    code: 201,
    data: position,
  });
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const positionService = new PositionService(positionRepository);
  const position = await positionService.updatePosition(
    Number(id),
    req.body
  );
  res.status(200).json({
    code: 200,
    data: position,
  });
})

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const positionService = new PositionService(positionRepository);
  const position = await positionService.getPositionById(Number(id));

  res.status(200).json({
    code: 200,
    data: position,
  });
});

export default router;
