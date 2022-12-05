import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { QueryOrder, Reference, wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CommentDto,
  CreateCommentParamsDto,
} from '@nx-post/api/shared-data-access-dtos';
import {
  CommentEntity,
  PostEntity,
  UserEntity,
} from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: EntityRepository<CommentEntity>,
    @InjectMapper()
    private mapper: Mapper
  ) {}

  async getComments(postId: string): Promise<CommentDto[]> {
    const comments = await this.commentRepository.find(
      { post: postId },
      {
        orderBy: { createdAt: QueryOrder.DESC },
        limit: 100,
        populate: ['author'],
      }
    );
    return this.mapper.mapArray(comments, CommentEntity, CommentDto);
  }

  async getComment(commentId: string): Promise<CommentDto> {
    try {
      const comment = await this.commentRepository.findOneOrFail(
        { id: commentId },
        {
          populate: ['author', 'post'],
        }
      );
      return this.mapper.map(comment, CommentEntity, CommentDto);
    } catch (e) {
      throw new NotFoundException(e, 'failed - no comment');
    }
  }

  async create(
    userId: string,
    { postId, text }: CreateCommentParamsDto
  ): Promise<CommentDto> {
    const newComment = await this.commentRepository.create({
      text,
      author: Reference.createFromPK(UserEntity, userId),
      post: Reference.createFromPK(PostEntity, postId),
    });
    await this.commentRepository.persistAndFlush(newComment);
    await wrap(newComment.post).init();
    return this.mapper.map(newComment, CommentEntity, CommentDto);
  }

  async delete(userId: string, commentId: string): Promise<void> {
    const comment = await this.commentRepository.findOneOrFail(
      { id: commentId },
      { populate: ['author', 'post', 'post.author'] }
    );

    if (comment == null) {
      throw new NotFoundException(commentId, 'failed - no comment');
    }

    // await comment.post.load();

    if (comment.author.id !== userId) {
      throw new ForbiddenException(userId, 'failed - cannot delete comment');
    }

    await this.commentRepository.removeAndFlush(comment);
  }
}
