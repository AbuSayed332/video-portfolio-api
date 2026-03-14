import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function ApiStandardResponse(options: {
  summary: string;
  successStatus?: number;
  successDescription?: string;
}) {
  return applyDecorators(
    ApiOperation({ summary: options.summary }),
    ApiResponse({
      status: options.successStatus || 200,
      description: options.successDescription || 'Operation successful',
    }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
