import { HttpStatus } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApiExceptionDto {
  @ApiPropertyOptional()
  statusCode?: number;

  @ApiPropertyOptional()
  message?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  error?: string;

  @ApiPropertyOptional()
  errors?: unknown;

  @ApiPropertyOptional()
  timestamp?: string;

  @ApiPropertyOptional()
  stack?: string;

  @ApiPropertyOptional()
  path?: string;

  constructor(
    message: string,
    error: string,
    stack: string,
    errors: unknown,
    path: string,
    statusCode: number
  ) {
    this.message = message;
    this.error = error;
    this.errors = errors;
    this.stack = stack;
    this.statusCode = statusCode;
    this.path = path;
    this.status = HttpStatus[statusCode];
    this.timestamp = new Date().toISOString();
  }
}
