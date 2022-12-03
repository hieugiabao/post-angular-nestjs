import { Module } from '@nestjs/common';
import { ApiFeatureConfigModule } from '@nx-post/api/feature-config';
import { AutomapperModule } from '@automapper/nestjs';
import { mikro } from '@automapper/mikro';
import { CamelCaseNamingConvention } from '@automapper/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DbConfig, dbConfig } from '@nx-post/api/utils-config';
import { ApiFeaturePostModule } from '@nx-post/api/feature-post';
import { ApiFeatureUserModule } from '@nx-post/api/feature-user';
import { ApiFeatureCommentModule } from '@nx-post/api/feature-comment';
import {
  BaseProfile,
  CommentProfile,
  PostProfile,
  UserProfile,
} from '@nx-post/api/shared-data-access-mappings';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: mikro(),
      namingConventions: new CamelCaseNamingConvention(),
    }),
    MikroOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (dbConfig: DbConfig) => ({
        dbName: dbConfig.dbName,
        clientUrl: dbConfig.uri,
        autoLoadEntities: true,
        type: 'mongo',
      }),
    }),
    ApiFeatureConfigModule,
    ApiFeaturePostModule,
    ApiFeatureUserModule,
    ApiFeatureCommentModule,
  ],
  // providers: [BaseProfile, UserProfile, PostProfile, CommentProfile],
})
export class AppModule {}
