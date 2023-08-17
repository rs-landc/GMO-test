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
import { AdminService } from './admins.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterAdminResponseDTO,
  FilterAdminRequestDTO,
  FilterAdminRequest,
  ShowAdminResponseDTO,
  ShowAdminParamsDTO,
  CreateAdminResponseDTO,
  CreateAdminRequestDTO,
  UpdateAdminResponseDTO,
  UpdateAdminParamsDTO,
  UpdateAdminRequestDTO,
  DeleteAdminResponseDTO,
  DeleteAdminParamsDTO,
} from './dto';
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @MethodGet('/api/admins')
  @ApiNestedQuery('admins', FilterAdminRequest)
  filter(@Query() queries: FilterAdminRequestDTO): Promise<FilterAdminResponseDTO> {
    return this.adminService.filter(queries);
  }

  @MethodGet('/api/admins/:id')
  show(@Param() params: ShowAdminParamsDTO): Promise<ShowAdminResponseDTO> {
    return this.adminService.show(params);
  }

  @MethodPost('/api/admins')
  create(@Body() request: CreateAdminRequestDTO): Promise<CreateAdminResponseDTO> {
    return this.adminService.create(request);
  }

  @MethodPut('/api/admins/:id')
  update(
    @Param() params: UpdateAdminParamsDTO,
    @Body() request: UpdateAdminRequestDTO,
  ): Promise<UpdateAdminResponseDTO> {
    return this.adminService.update(params, request);
  }

  @MethodDelete('/api/admins/:id')
  delete(@Param() params: DeleteAdminParamsDTO): Promise<DeleteAdminResponseDTO> {
    return this.adminService.delete(params);
  }
}
