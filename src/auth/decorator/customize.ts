import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
export const RESPONSE_MESSAGE = 'response_message';

export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const model = args.object.constructor as Model<any>;
          if (!model) return false;

          const existing = await model.findOne({ [args.property]: value });
          return !existing; // Trả về true nếu không tìm thấy giá trị trùng
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} đã tồn tại`;
        },
      },
    });
  };
}
