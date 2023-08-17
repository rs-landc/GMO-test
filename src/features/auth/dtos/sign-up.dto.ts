import { StringField } from '@decorators/field.decorator';

export class AuthRegistrationAdminRequestDto {
  @StringField({ email: true })
  email: string;

  @StringField({ maxLength: 255, minLength: 0, password: true })
  password: string;
}
