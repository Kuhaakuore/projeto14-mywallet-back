import httpStatus from 'http-status';

export function databaseConectionError() {
  return {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'Database connection error',
  };
}
