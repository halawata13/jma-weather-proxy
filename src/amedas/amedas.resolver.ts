import { Args, Query, Resolver } from '@nestjs/graphql';
import { AmedasService } from './amedas.service';
import { Amedas } from './amedas.schema';
import { CommonService } from '../common/common.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver()
export class AmedasResolver {
  constructor(
    private readonly amedasService: AmedasService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * アメダス
   *
   * @param dailyAreaCode
   */
  @Query(() => Amedas)
  async amedas(@Args('areaCode') dailyAreaCode: string): Promise<Amedas> {
    const amedasCode = await this.commonService.convertAmedasCode(dailyAreaCode);
    return await this.amedasService.getAmedas(amedasCode);
  }
}
