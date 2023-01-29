/*!
    @e53e04ac/ipp5-token-issuer/index.d.ts
    Copyright (C) @e53e04ac
    MIT License
*/

import { default as AsyncLock } from 'async-lock';
import { default as Joi } from 'joi';

import { Base } from 'base';
import { Get } from 'hold';
import { ValueOrGet } from 'hold';
import { KeyValueStorage } from 'key-value-storage';

export declare namespace Ipp5TokenIssuer {

    type Options = {
        readonly idpRegisterUrn: ValueOrGet<string>;
        readonly idpChallengeTokenUrn: ValueOrGet<string>;
        readonly idpTokenUrn: ValueOrGet<string>;
        readonly apiUrn: ValueOrGet<string>;
        readonly idpRegisterPrivateKey: ValueOrGet<string>;
        readonly idpRegisterPublicKey: ValueOrGet<string>;
        readonly idpChallengeTokenPrivateKey: ValueOrGet<string>;
        readonly idpChallengeTokenPublicKey: ValueOrGet<string>;
        readonly idpTokenPrivateKey: ValueOrGet<string>;
        readonly pendingItemStorage: ValueOrGet<KeyValueStorage<PendingItem>>;
        readonly registeredItemStorage: ValueOrGet<KeyValueStorage<RegisteredItem>>;
    };

    type RegisterChallengeTokenPayload = {
        readonly iss: string;
        readonly sub?: undefined | string;
        readonly aud: string;
        readonly exp: number;
        readonly nbf: number;
        readonly iat: number;
        readonly jti: string;
        readonly clientOneTimeKey: string;
        readonly iv: string;
        readonly serverOneTimeKey: string;
    };

    type TokenChallengeTokenPayload = {
        readonly iss: string;
        readonly sub?: undefined | string;
        readonly aud: string;
        readonly exp: number;
        readonly nbf: number;
        readonly iat: number;
        readonly jti: string;
        readonly clientId: string;
        readonly challenge: string;
    };

    type PendingItem = {
        readonly clientOneTimeKey: string;
        readonly clientOneTimePublicKeyData: ArrayBuffer;
        readonly serverOneTimePrivateKeyData: ArrayBuffer;
        readonly clientAgentId: string;
        readonly clientAgentTime: number;
        readonly clientAgentNonce: string;
    };

    type RegisteredItem = {
        readonly clientId: string;
        readonly clientPublicKeyData: ArrayBuffer;
        readonly clientAgentId: string;
        readonly clientAgentTime: number;
        readonly clientAgentNonce: string;
    };

    type _Self = {
        readonly options: Get<Options>;
        readonly _options: Get<unknown>;
        readonly base64urlSchema: Get<Joi.StringSchema>;
        readonly jwtSchema: Get<Joi.StringSchema>;
        readonly urnSchema: Get<Joi.StringSchema>;
        readonly clientAgentIdSchema: Get<Joi.StringSchema>;
        readonly clientAgentTimeSchema: Get<Joi.NumberSchema>;
        readonly clientAgentNonceSchema: Get<Joi.StringSchema>;
        readonly clientOneTimeKeySchema: Get<Joi.StringSchema>;
        readonly clientIdSchema: Get<Joi.StringSchema>;
        readonly registerRequestParamsSchema: Get<Joi.ObjectSchema<{
            readonly clientAgentId: string;
            readonly clientAgentTime: number;
            readonly clientAgentNonce: string;
            readonly clientOneTimeKey: string;
        }>>;
        readonly registerResponseParamsSchema: Get<Joi.ObjectSchema<{
            readonly clientAgentId: string;
            readonly clientAgentTime: number;
            readonly clientAgentNonce: string;
            readonly challengeToken: string;
            readonly challengeResponse: string;
        }>>;
        readonly tokenRequestParamsSchema: Get<Joi.ObjectSchema<{
            readonly clientAgentId: string;
            readonly clientAgentTime: number;
            readonly clientAgentNonce: string;
            readonly clientId: string;
        }>>;
        readonly tokenResponseParamsSchema: Get<Joi.ObjectSchema<{
            readonly clientAgentId: string;
            readonly clientAgentTime: number;
            readonly clientAgentNonce: string;
            readonly challengeToken: string;
            readonly challengeResponse: string;
        }>>;
        readonly tryPromise: {
            <T>(promise: Promise<T>): Promise<{
                readonly error: null | Error;
                readonly value: null | T;
            }>;
        };
        readonly arrayBufferFromBase64url: {
            (base64url: string): ArrayBuffer;
        };
        readonly base64urlFromArrayBuffer: {
            (arrayBuffer: ArrayBuffer): string;
        };
        readonly randomBytes: {
            (length: number): ArrayBuffer;
        };
        readonly decodeClientOneTimePublicKey: {
            (arrayBuffer: ArrayBuffer): Promise<CryptoKey>;
        };
        readonly createIV: {
            (): ArrayBuffer;
        };
        readonly createServerOneTimeKeyPair: {
            (): Promise<CryptoKeyPair>;
        };
        readonly encodeServerOneTimePrivateKey: {
            (privateKey: CryptoKey): Promise<ArrayBuffer>;
        };
        readonly encodeServerOneTimePublicKey: {
            (publicKey: CryptoKey): Promise<ArrayBuffer>;
        };
        readonly createRegisterChallengeToken: {
            (params: {
                readonly clientOneTimeKey: string;
                readonly iv: string;
                readonly serverOneTimeKey: string;
            }): Promise<string>;
        };
        readonly parseRegisterChallengeToken: {
            (string: string): Promise<RegisterChallengeTokenPayload>;
        };
        readonly decodeServerOneTimePrivateKey: {
            (arrayBuffer: ArrayBuffer): Promise<CryptoKey>;
        };
        readonly deriveOneTimeSharedKey: {
            (publicKey: CryptoKey, privateKey: CryptoKey): Promise<CryptoKey>;
        };
        readonly decryptClientPublicKeyData: {
            (iv: ArrayBuffer, sharedKey: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
        };
        readonly decodeClientPublicKey: {
            (arrayBuffer: ArrayBuffer): Promise<CryptoKey>;
        };
        readonly createClientId: {
            (): Promise<string>;
        };
        readonly createChallenge: {
            (): ArrayBuffer;
        };
        readonly createChallengeToken: {
            (params: {
                readonly clientId: string;
                readonly challenge: string;
            }): Promise<string>;
        };
        readonly parseChallengeToken: {
            (string: string): Promise<TokenChallengeTokenPayload>;
        };
        readonly verifyChallengeResponse: {
            (publicKey: CryptoKey, challengeResponse: ArrayBuffer, challenge: ArrayBuffer): Promise<boolean>;
        };
        readonly createToken: {
            (params: {
                readonly clientId: string;
            }): Promise<string>;
        };
        readonly asyncLock: Get<AsyncLock>;
    };

    type Self = Base & {
        readonly _Ipp5TokenIssuer: Get<_Self>;
        readonly registerRequest: {
            (params: {
                readonly clientAgentId: unknown;
                readonly clientAgentTime: unknown;
                readonly clientAgentNonce: unknown;
                readonly clientOneTimeKey: unknown;
            }): Promise<{
                readonly error: undefined | null | Error;
                readonly challengeToken: null | string;
            }>;
        };
        readonly registerResponse: {
            (params: {
                readonly clientAgentId: unknown;
                readonly clientAgentTime: unknown;
                readonly clientAgentNonce: unknown;
                readonly challengeToken: unknown;
                readonly challengeResponse: unknown;
            }): Promise<{
                readonly error: null | Error;
                readonly clientId: null | string;
            }>;
        };
        readonly tokenRequest: {
            (params: {
                readonly clientAgentId: unknown;
                readonly clientAgentTime: unknown;
                readonly clientAgentNonce: unknown;
                readonly clientId: unknown;
            }): Promise<{
                readonly error: null | Error;
                readonly challengeToken: null | string;
            }>;
        };
        readonly tokenResponse: {
            (params: {
                readonly clientAgentId: unknown;
                readonly clientAgentTime: unknown;
                readonly clientAgentNonce: unknown;
                readonly challengeToken: unknown;
                readonly challengeResponse: unknown;
            }): Promise<{
                readonly error: null | Error;
                readonly token: null | string;
            }>;
        };
    };

    type Constructor = {
        (options: Options): Self;
    };

    type Companion = Record<never, never>;

    type ConstructorWithCompanion = Constructor & Companion;

}

export declare type Ipp5TokenIssuer = Ipp5TokenIssuer.Self;

export declare const Ipp5TokenIssuer: Ipp5TokenIssuer.ConstructorWithCompanion;
