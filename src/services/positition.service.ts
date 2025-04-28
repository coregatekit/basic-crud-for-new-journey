import type { Repository } from "typeorm";
import type { Position } from "../entities/position";

export class PositionService {
  private positionRepository: Repository<Position>;

  constructor(positionRepo: Repository<Position>) {
    this.positionRepository = positionRepo;
  }

  async getAllPositions(): Promise<Position[]> {
    return this.positionRepository.find();
  }

  async searchPositionByName(text: string): Promise<Position[]> {
    return await this.positionRepository
      .createQueryBuilder("position")
      .where("position.title LIKE :text", { text: `%${text}%` })
      .getMany();
  }

  async getPositionById(id: number): Promise<Position | null> {
    return this.positionRepository.findOneBy({ id });
  }

  async createPosition(position: Position): Promise<Position> {
    return this.positionRepository.save(position);
  }

  async updatePosition(
    id: number,
    position: Partial<Position>
  ): Promise<Position | null> {
    await this.positionRepository.update(id, position);
    return this.getPositionById(id);
  }
}
