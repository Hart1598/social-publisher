import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EVENT_BUS_SERVICE, EVENT_BUS_SERVICE_CLIENT } from "@app/constants";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SignIn, SignUp, SignUpAdmin, GetUserById, GetUserList, RefreshToken, VerifyAuthCode, CreateUploadURL, DeleteFile, DeleteUserFile, GetFile, GetUserFile, GetFiles, GetUserFiles, GetUserFilesURL, GoogleCallback, GoogleSignInUrl, TikTokCallback, TikTokSignInUrl } from "@app/contracts";

export const eventBusTopics = [
  SignIn.topic,
  SignUp.topic,
  SignUpAdmin.topic,
  GetUserById.topic,
  GetUserList.topic,
  RefreshToken.topic,
  VerifyAuthCode.topic,
  CreateUploadURL.topic,
  DeleteFile.topic,
  DeleteUserFile.topic,
  GetFile.topic,
  GetUserFile.topic,
  GetFiles.topic,
  GetUserFiles.topic,
  GetUserFilesURL.topic,
  GoogleSignInUrl.topic,
  GoogleCallback.topic,
  TikTokSignInUrl.topic,
  TikTokCallback.topic
];

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: EVENT_BUS_SERVICE,
          useFactory: async (configService: ConfigService) => {
            const broker = configService.getOrThrow<string>('KAFKA_BROKER');

            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: EVENT_BUS_SERVICE_CLIENT,
                  brokers: [broker],
                },
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class BrokerClientsModule { }
