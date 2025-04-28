import { AppDataSource } from "../data-source";
import { Position } from "../entities/position";

const positionRepository = AppDataSource.getRepository(Position);

export default positionRepository;
