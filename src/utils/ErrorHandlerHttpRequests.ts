import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const ErrorHandlerHttpRequests = (error: any): undefined => { // Cambiamos el tipo a 'any' para capturar errores de diferentes fuentes.
  const logger = new Logger();
  logger.error(error.message, error.stack);

  // Verifica si error tiene una propiedad code
  if (error.code) {
    switch (error.code) {
      case '23505': // Violación de unicidad
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      case '23503': // Violación de clave foránea
        throw new HttpException('Invalid foreign key reference', HttpStatus.BAD_REQUEST);
      case '23502': // Violación de restricción NOT NULL
        throw new HttpException('Required field cannot be null', HttpStatus.BAD_REQUEST);
      default:
        throw new InternalServerErrorException('Something went wrong, Try again!');
    }
  } else if (error instanceof HttpException) {
    // Si el error es ya una HttpException, lo re-lanzamos
    throw error;
  } else {
    // Manejo de errores genéricos
    throw new InternalServerErrorException('Something went wrong, Try again!');
  }
}

export default ErrorHandlerHttpRequests;
