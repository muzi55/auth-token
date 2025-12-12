import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      userId,
    });
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
      },
    });
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { userId },
      relations: ['user'],
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
      },
    });
  }

  async findRandomPosts(limit: number = 5): Promise<Post[]> {
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'user.id',
        'user.email',
        'user.name',
      ])
      .orderBy('RANDOM()')
      .take(limit)
      .getMany();
  }
}
