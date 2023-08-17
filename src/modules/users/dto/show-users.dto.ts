import { User } from '@entities/users';
import { NumberField } from 'src/decorators/field.decorator';

export class ShowUserParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class ParticipantShowUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class ShowUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
  participants: ParticipantShowUserResponse[];
}

export class ShowUserResponseDTO {
  user: ShowUserResponse;

  constructor(user: User) {
    this.user = {
      ...user,
      id: user?.id,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
      fullname: user?.fullname,
      birthday: user?.birthday,
      email: user?.email,
      password: user?.password,
      participants: user?.participants?.map((participant) => ({
        ...participant,
        id: participant?.id,
        created_at: participant?.created_at,
        updated_at: participant?.updated_at,
        status: participant?.status,
        user_id: participant?.user_id,
        party_id: participant?.party_id,
      })),
    };
  }
}
