import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-payments'), // ✅ your local MongoDB connection
    AuthModule,
    PaymentsModule,
  ],
})
export class AppModule {}
