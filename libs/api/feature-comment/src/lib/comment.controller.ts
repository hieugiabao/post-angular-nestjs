import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from '@nx-post/api/data-access-comment';
import {
  AuthUserDto,
  CommentDto,
  CreateCommentParamsDto,
} from '@nx-post/api/shared-data-access-dtos';
import { ApiErrors, CurrentUser } from '@nx-post/api/shared-utils-decorators';

@Controller('comments')
@ApiErrors()
@ApiBearerAuth()
@ApiTags('Comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('post/:postId')
  @ApiOkResponse({ type: CommentDto, isArray: true })
  async get(@Param('postId') postId: string): Promise<CommentDto[]> {
    return await this.commentService.getComments(postId);
  }

  @Get(':commentId')
  @ApiOkResponse({ type: CommentDto })
  async getById(@Param('commentId') commentId: string): Promise<CommentDto> {
    return await this.commentService.getComment(commentId);
  }

  @Post()
  @ApiOkResponse({ type: CommentDto })
  @UseGuards(AuthGuard())
  async create(
    @CurrentUser() currentUser: AuthUserDto,
    @Body() dto: CreateCommentParamsDto
  ): Promise<CommentDto> {
    return this.commentService.create(currentUser.id, dto);
  }

  @Delete(':commentId')
  @ApiOkResponse()
  @UseGuards(AuthGuard())
  async delete(
    @CurrentUser() currentUser: AuthUserDto,
    @Param('commentId') commentId: string
  ): Promise<void> {
    this.commentService.delete(currentUser.id, commentId);
  }
}
