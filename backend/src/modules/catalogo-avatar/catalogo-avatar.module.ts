import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoAvatarService } from './catalogo-avatar.service';
import { CatalogoAvatarController } from './catalogo-avatar.controller';
import { CatalogoAvatar } from './entities/catalogo-avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoAvatar])],
  controllers: [CatalogoAvatarController],
  providers: [CatalogoAvatarService],
  exports: [CatalogoAvatarService],
})
export class CatalogoAvatarModule {}
