import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('my-posts')
  @UseGuards(JwtAuthGuard)
  async findMyPosts(@Request() req) {
    return this.postsService.findByUserId(req.user.userId);
  }

  @Get('random')
  async findRandomPosts(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 5;
    return this.postsService.findRandomPosts(limitNumber);
  }
}
