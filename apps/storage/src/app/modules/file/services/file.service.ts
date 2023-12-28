import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { File } from "../entities/file.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private repository: Repository<File>,
  ) {}

  create(item: Partial<File>) {
    return this.repository.create(item)
  }

  save(item: File) {
    return this.repository.save(item)
  }

  deleteById(id: string) {
    const options: FindOptionsWhere<File> = {
      id,
    }

    return this.repository.delete(options)
  }

  findById(id: string) {
    return this.repository.findOne({
      where: {
        id,
      }
    })
  }

  findByIdAndUserId(id: string, userId: string) {
    return this.repository.findOne({
      where: {
        id,
        userId,
      }
    })
  }

  findAndCount(take: number, skip: number) {
    return this.repository.findAndCount({
      take,
      skip,
    })
  }

  updateById(id: string, file: Partial<File>) {
    const options: FindOptionsWhere<File> = {
      id,
    }

    return this.repository.update(options, file)
  }
}
