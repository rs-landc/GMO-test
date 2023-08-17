import {
  Controller,
  Query,
  Get as MethodGet,
  Param,
  Body,
  Post as MethodPost,
  Put as MethodPut,
  Delete as MethodDelete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterUserResponseDTO,
  FilterUserRequestDTO,
  FilterUserRequest,
  ShowUserResponseDTO,
  ShowUserParamsDTO,
  CreateUserResponseDTO,
  CreateUserRequestDTO,
  UpdateUserResponseDTO,
  UpdateUserParamsDTO,
  UpdateUserRequestDTO,
  DeleteUserResponseDTO,
  DeleteUserParamsDTO,
} from './dto';
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MethodGet('/api/users')
  @ApiNestedQuery('users', FilterUserRequest)
  filter(@Query() queries: FilterUserRequestDTO): Promise<FilterUserResponseDTO> {
    return this.userService.filter(queries);
  }

  @MethodGet('/api/users/:id')
  show(@Param() params: ShowUserParamsDTO): Promise<ShowUserResponseDTO> {
    return this.userService.show(params);
  }

  @MethodPost('/api/users')
  create(@Body() request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return this.userService.create(request);
  }

  @MethodPut('/api/users/:id')
  update(
    @Param() params: UpdateUserParamsDTO,
    @Body() request: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    return this.userService.update(params, request);
  }

  @MethodDelete('/api/users/:id')
  delete(@Param() params: DeleteUserParamsDTO): Promise<DeleteUserResponseDTO> {
    return this.userService.delete(params);
  }
}
