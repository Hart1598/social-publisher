import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AUTH_SERVICE, AUTH_SERVICE_CLIENT, AUTH_CONSUMER_GROUP_ID } from "@app/constants";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { v4 } from "uuid";
import { SignIn, SignUp, SignUpAdmin, GetUserById, GetUserList } from "@app/contracts";

export const authServiceTopics = [SignIn.topic, SignUp.topic, SignUpAdmin.topic, GetUserById.topic, GetUserList.topic];

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: AUTH_SERVICE,
          useFactory: async (configService: ConfigService) => {
            const broker = configService.getOrThrow<string>('KAFKA_BROKER');

            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: AUTH_SERVICE_CLIENT,
                  brokers: [broker],
                },
                consumer: {
                  groupId: `${AUTH_CONSUMER_GROUP_ID}_${v4()}`,
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
export class BrokerClientsModule {}
