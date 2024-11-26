import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

export function handleHttpError(logger: Logger, error: unknown) {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;
    logger.error(`HTTP Error: ${axiosError.message}`);
    throw new HttpException(axiosError.response?.data
      || 'An unexpected error occurred', axiosError.response?.status
      || HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    logger.error(`Unknown Error: ${JSON.stringify(error)}`);
    throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
