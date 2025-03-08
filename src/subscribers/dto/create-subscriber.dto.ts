import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  email: string;

  @IsNotEmpty({ message: 'Skills is required' })
  skills: string[];
}
