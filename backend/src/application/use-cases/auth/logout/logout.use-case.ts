import { TokenBlacklistService } from '../../../../infra/services/token-blacklist.service';

export class LogoutUseCase {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {}

  async execute(token: string): Promise<{ message: string }> {
    this.tokenBlacklistService.addToBlacklist(token);
    return { message: 'Logout successful' };
  }
}
