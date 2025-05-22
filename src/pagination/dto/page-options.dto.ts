import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Prisma } from '@prisma/client';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class PageOptionsDto {
  constructor(params: Pick<PageOptionsDto, 'take' | 'page' | 'order'>) {
    if (params) {
      this.order = params.order ?? this.order;
      this.take = params.take ?? this.take;
      this.page = params.page ?? this.page;
    }
  }

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Prisma.SortOrder = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 1000,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
