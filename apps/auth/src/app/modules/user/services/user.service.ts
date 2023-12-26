import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.usersRepository.create(user)
  }

  save(user: User) {
    return this.usersRepository.save(user)
  }

  isExistByEmail(email: string) {
    return this.usersRepository.exist({
      where: {
        email,
      }
    })
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      }
    })
  }

  findById(id: string) {
    return this.usersRepository.findOne({
      where: {
        id,
      }
    })
  }

  findAndCount(take: number, skip: number) {
    return this.usersRepository.findAndCount({
      take,
      skip,
    })
  }
}
