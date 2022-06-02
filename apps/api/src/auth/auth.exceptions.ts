import { ConflictException, UnauthorizedException } from '@nestjs/common';

export class AuthEmailExists extends ConflictException {
  getResponse() {
    return 'EMAIL_EXISTS';
  }
}

export class AuthUsernameExists extends ConflictException {
  getResponse() {
    return 'USERNAME_EXISTS';
  }
}

export class AuthPersonUnauthorized extends UnauthorizedException {
  getResponse() {
    return 'PERSON_UNAUTHORIZED';
  }
}

export class AuthBadCredentials extends UnauthorizedException {
  getResponse() {
    return 'BAD_CREDENTIALS';
  }
}

export class AuthJWTMalformed extends UnauthorizedException {
  getResponse() {
    return 'JWT_MALFORMED';
  }
}
