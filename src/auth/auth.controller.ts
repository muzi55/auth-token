import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signUp(signUpDto);

    // 리프레시 토큰을 쿠키에 설정
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 1000, // 1분 (리프레시 토큰 만료 시간과 동일)
    });

    // 응답에서 refreshToken 제거
    const { refreshToken, ...response } = result;
    return response;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(signInDto);

    // 리프레시 토큰을 쿠키에 설정
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 1000, // 1분 (리프레시 토큰 만료 시간과 동일)
    });

    // 응답에서 refreshToken 제거
    const { refreshToken, ...response } = result;
    return response;
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    const tokens = await this.authService.refreshTokens(userId, refreshToken);

    // 새로운 리프레시 토큰을 쿠키에 설정
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 1000, // 1분 (리프레시 토큰 만료 시간과 동일)
    });

    // 응답에서 refreshToken 제거하고 accessToken만 반환
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.user.userId);

    // 쿠키에서 리프레시 토큰 제거
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: '로그아웃되었습니다.' };
  }
}
