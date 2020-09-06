import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';


export class CreateUserDto {
  @ApiModelPropertyOptional()
  readonly id: string;

  @ApiModelPropertyOptional()
  readonly name: string;

  @ApiModelPropertyOptional()
  readonly email: string;

  @ApiModelPropertyOptional()
  readonly password: string;

  @ApiModelPropertyOptional()
  readonly userName: string;

  @ApiModelPropertyOptional()
  readonly isActive: boolean;
}
