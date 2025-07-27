import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '../../infra/http/controllers/auth/auth.controller';
import { UserModel } from '../../infra/repositories/sequelize/user.model';
import { TokenBlacklistService } from '../../infra/services/token-blacklist.service';
import { AUTH_PROVIDERS } from '../../providers/auth-providers/auth.provider';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [TokenBlacklistService, ...AUTH_PROVIDERS],
  exports: [TokenBlacklistService, ...AUTH_PROVIDERS],
})
export class AuthModule {}
