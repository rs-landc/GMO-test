import { ScopeEnum } from './scope.dto';

export class TokenResponseDTO {
  access_token: string;
  refresh_token: string;
  resource_owner: string;
  resource_id: number;
  expires_in: number;
  token_type: string;
  scope: ScopeEnum;
  created_at: Date;
  refresh_token_expires_in: number | null;
}
