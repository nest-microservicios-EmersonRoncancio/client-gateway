import { PartialType } from '@nestjs/mapped-types';
import { CreateHealtCheckDto } from './create-healt-check.dto';

export class UpdateHealtCheckDto extends PartialType(CreateHealtCheckDto) {}
