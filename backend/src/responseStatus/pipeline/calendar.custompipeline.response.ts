import {
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

const ERROR_CODES: Record<string, number> = {
  isNotEmpty: 871,
  isString: 872,
  isDate: 873,
  validateIf: 874,
  typeError: 875,
  invalidRRule: 876,
  isBoolean: 877,
  isNumber: 878,
  isArray: 879,
};

export const CustomValidationPipe = new ValidationPipe({
  exceptionFactory: (errors: ValidationError[]) => {
    return new BadRequestException({
      statusCode: 400,
      code: 870,
      errors: errors.map((err) => ({
        field: err.property,
        code: ERROR_CODES[Object.keys(err.constraints || {})[0]] || 999, // Default to 999 if not mapped
        issues: Object.values(err.constraints || {}), // Actual error messages
      })),
    });
  },
});
