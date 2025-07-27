import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private blacklistedTokens: Set<string> = new Set();

  addToBlacklist(token: string): void {
    this.blacklistedTokens.add(token);
    this.logger.log(
      `Token added to blacklist. Total blacklisted tokens: ${this.blacklistedTokens.size}`,
    );
  }

  isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  removeExpiredTokens(): void {
    const initialSize = this.blacklistedTokens.size;
    const tokensToRemove: string[] = [];

    this.blacklistedTokens.forEach((token) => {
      try {
        const decoded = jwt.decode(token) as any;

        if (decoded && decoded.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (decoded.exp < currentTime) {
            tokensToRemove.push(token);
          }
        } else {
          tokensToRemove.push(token);
        }
      } catch (error) {
        tokensToRemove.push(token);
      }
    });

    tokensToRemove.forEach((token) => {
      this.blacklistedTokens.delete(token);
    });

    const finalSize = this.blacklistedTokens.size;
    const removedCount = initialSize - finalSize;

    this.logger.log(
      `Expired token cleanup completed. Removed ${removedCount} expired tokens. ` +
        `Remaining blacklisted tokens: ${finalSize}`,
    );
  }
}
