import {
  Controller,
  Delete,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ROUTES, SWAGGER_API_TAGS } from 'src/utils/constants';
import { ProfilesService } from './profiles.service';
import { UploadAvatar } from './decorators/upload-avatar.decorator';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags(SWAGGER_API_TAGS.PROFILES)
@Controller(ROUTES.PROFILES)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('/upload-avatar')
  @UploadAvatar()
  async uploadAvatar(
    @Req() req,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.profilesService.saveAvatar(req.user.uuid, file.filename);
  }

  @Put('/update-avatar')
  @UploadAvatar()
  async updateAvatar(
    @Req() req,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.profilesService.updateAvatar(req.user.uuid, file.filename);
  }

  @Delete('/remove-avatar')
  async removeAvatar(@Req() req) {
    return this.profilesService.removeAvatar(req.user.uuid);
  }
}

// new ParseFilePipeBuilder()
// .addFileTypeValidator({
//   fileType: new RegExp('.(png|jpeg|jpg)'),
// })
// .addMaxSizeValidator({
//   message: 'Please upload a file less than 1MB',
//   maxSize: 1024 * 1024 * 1,
// })
// .build({
//   errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
// }),