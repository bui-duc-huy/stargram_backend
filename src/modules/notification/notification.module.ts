import { Module } from '@nestjs/common';
import { NotificationResolver } from './notification.resolver'
import { NotificationService } from './notification.service' 

@Module({
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
