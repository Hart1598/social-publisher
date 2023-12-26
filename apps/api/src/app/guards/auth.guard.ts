/* eslint-disable no-unsafe-finally */
import { ALLOWED_ATTRIBUTES_KEYS, DEFAULT_ALLOWED_ATTRIBUTES } from "@app/constants";
import { AllowedAuthUserAttributes, AuthDecoratorKey, AuthStrategyType, JWTUser } from "@app/types";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends BaseAuthGuard(AuthStrategyType.JWT_AUTH) {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean>{
      const isPublic = this.checkIfPublic(context);

      if(isPublic) return true;

      if (isPublic) {
        try {
          await super.canActivate(context);
        } finally {
          return true;
        }
      }

      await super.canActivate(context);

      const allowedAttributes = this.getAllowedAttributes(context);

      const user = this.getJWTUser(context)

      const isHasAccess = this.checkAuthUserAttributes(user, allowedAttributes);

      return isHasAccess;
  }

  private checkIfPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AuthDecoratorKey.PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    return isPublic || false;
  }

  private getJWTUser(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest()

    const decodedToken = request.user as JWTUser;

    return decodedToken;
  }

  private checkAuthUserAttributes(user: JWTUser, attributes: AllowedAuthUserAttributes) {
    const { role, status } = user;

    const { allowedRoles, allowedStatuses } = attributes;

    const isHasAccessByRole = allowedRoles.includes(role);

    const isHasAccessByStatus = allowedStatuses.includes(status);

    return isHasAccessByRole && isHasAccessByStatus;
  }

  private getAllowedAttributes(
    context: ExecutionContext,
  ): AllowedAuthUserAttributes {
    const attributes =
      this.reflector.getAllAndOverride<AllowedAuthUserAttributes>(
        AuthDecoratorKey.PROTECTED,
        [context.getHandler(), context.getClass()],
      );

    const allowedAttributes = {};

    for (const allowedAttributeKey of ALLOWED_ATTRIBUTES_KEYS) {
      const hasAttributeValue = Boolean(
        attributes && attributes[allowedAttributeKey]?.length,
      );

      const attributeValue = hasAttributeValue
        ? attributes[allowedAttributeKey]
        : DEFAULT_ALLOWED_ATTRIBUTES[allowedAttributeKey];

      allowedAttributes[allowedAttributeKey] = attributeValue;
    }

    return allowedAttributes as AllowedAuthUserAttributes;
  }
}
