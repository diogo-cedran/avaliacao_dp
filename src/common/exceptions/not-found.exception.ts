// src/common/exceptions/not-found.exception.ts
import { NotFoundException as NestNotFoundException } from '@nestjs/common';

export class NotFoundException extends NestNotFoundException {
  constructor(message?: string) {
    super(message || 'Resource not found');
  }
}
