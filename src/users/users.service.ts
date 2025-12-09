import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      refreshTokenVersion: 0, // 초기 버전 0으로 설정
    });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string | null,
  ): Promise<void> {
    const user = await this.findById(userId);
    if (!user) return;

    const hashedRefreshToken = refreshToken
      ? await bcrypt.hash(refreshToken, 10)
      : undefined;

    // 새로운 refresh token이 발급될 때마다 버전을 증가시킴
    const newVersion = refreshToken
      ? (user.refreshTokenVersion || 0) + 1
      : user.refreshTokenVersion;

    await this.usersRepository.update(userId, {
      refreshToken: hashedRefreshToken,
      refreshTokenVersion: newVersion,
    });
  }

  async validateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user || !user.refreshToken) {
      return false;
    }
    
    // 저장된 해시와 비교
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    
    if (!isValid) {
      return false;
    }

    return true;
  }

  // 이미 사용된 refresh token인지 확인하고 무효화하는 메서드
  async validateAndInvalidateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user || !user.refreshToken) {
      return false;
    }

    // 저장된 해시와 비교
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isValid) {
      // 만약 토큰이 유효하지 않다면, 재사용 시도로 간주하고 모든 refresh token 무효화
      await this.usersRepository.update(userId, {
        refreshToken: undefined,
        refreshTokenVersion: (user.refreshTokenVersion || 0) + 1,
      });
      return false;
    }

    return true;
  }
}
