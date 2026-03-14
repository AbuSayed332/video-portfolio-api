import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const uri = configService.get('NODE_ENV') === 'production' 
    ? configService.get('MONGODB_URI_PROD')
    : configService.get('MONGODB_URI');

  return {
    uri,
    retryWrites: true,
    w: 'majority',
    // Connection options
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  };
};