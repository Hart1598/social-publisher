import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AuthCode } from "../entity";
import { PublicUser } from "@app/types";
import { ExceptionService } from "@app/utils";

@Injectable()
export class AuthCodeService {
  constructor(
    @InjectRepository(AuthCode)
    private repository: Repository<AuthCode>,
    private readonly exceptionService: ExceptionService,
  ) {}

  private generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000)
  }

  private getExpiresAt() {
    const currentDate = new Date();

    const expiresAt = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return expiresAt;
  }

  async createVerificationCode(user: PublicUser) {
    const { id: userId } = user;

    const code = this.generateRandomCode();

    const expiresAt = this.getExpiresAt()

    const authCode = this.create({
      userId,
      code,
      expiresAt,
    })

    const createdAuthCode = await this.save(authCode);

    return createdAuthCode;
  }

  async validateAuthCode(code: number, userId: string) {
    const authCode = await this.findByCodeAndUserId(code, userId);

    if(!authCode) throw this.exceptionService.notFound()

    await this.deleteById(authCode.id);

    return true;
  }

  create(item: Partial<AuthCode>) {
    return this.repository.create(item)
  }

  save(item: AuthCode) {
    return this.repository.save(item)
  }

  isExistByCodeAndUserId(code: number, userId: string) {
    return this.repository.exist({
      where: {
        code,
        userId,
      }
    })
  }

  findByCodeAndUserId(code: number, userId: string) {
    return this.repository.findOne({
      where: {
        code,
        userId,
      }
    })
  }

  deleteById(id: string) {
    const options: FindOptionsWhere<AuthCode> = {
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

  findAndCount(take: number, skip: number) {
    return this.repository.findAndCount({
      take,
      skip,
    })
  }
}
