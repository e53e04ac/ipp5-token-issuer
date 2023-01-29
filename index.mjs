/*!
    @e53e04ac/ipp5-token-issuer/index.mjs
    Copyright (C) @e53e04ac
    MIT License
*/

import { randomUUID as cryptoRandomUUID } from 'node:crypto';
import { webcrypto } from 'node:crypto';

import { default as AsyncLock } from 'async-lock';
import { default as Joi } from 'joi';
import { default as jsonwebtoken } from 'jsonwebtoken';

import { Base } from 'base';
import { hold } from 'hold';
import { unwrap } from 'hold';

const { sign: jsonwebtokenSign } = jsonwebtoken;
const { verify: jsonwebtokenVerify } = jsonwebtoken;

/** @type {import('.').Ipp5TokenIssuer.Constructor} */
const constructor = ((options) => {

    const _options = ({
        idpRegisterUrn: hold(() => {
            return unwrap(options.idpRegisterUrn);
        }),
        idpChallengeTokenUrn: hold(() => {
            return unwrap(options.idpChallengeTokenUrn);
        }),
        idpTokenUrn: hold(() => {
            return unwrap(options.idpTokenUrn);
        }),
        apiUrn: hold(() => {
            return unwrap(options.apiUrn);
        }),
        idpRegisterPrivateKey: hold(() => {
            return unwrap(options.idpRegisterPrivateKey);
        }),
        idpRegisterPublicKey: hold(() => {
            return unwrap(options.idpRegisterPublicKey);
        }),
        idpChallengeTokenPrivateKey: hold(() => {
            return unwrap(options.idpChallengeTokenPrivateKey);
        }),
        idpChallengeTokenPublicKey: hold(() => {
            return unwrap(options.idpChallengeTokenPublicKey);
        }),
        idpTokenPrivateKey: hold(() => {
            return unwrap(options.idpTokenPrivateKey);
        }),
        pendingItemStorage: hold(() => {
            return unwrap(options.pendingItemStorage);
        }),
        registeredItemStorage: hold(() => {
            return unwrap(options.registeredItemStorage);
        }),
    });

    /** @type {import('.').Ipp5TokenIssuer._Self} */
    const _self = ({
        options: (() => {
            return options;
        }),
        _options: (() => {
            return _options;
        }),
        base64urlSchema: hold(() => {
            return Joi.string().regex(/^[0-9A-Za-z\-_]*$/);
        }),
        jwtSchema: hold(() => {
            return Joi.string().regex(/^[0-9A-Za-z\-_]+\.[0-9A-Za-z\-_]+\.[0-9A-Za-z\-_]+$/);
        }),
        urnSchema: hold(() => {
            return Joi.string().regex(/^urn(:[0-9A-Za-z\-_]+)*$/);
        }),
        clientAgentIdSchema: hold(() => {
            return _self.base64urlSchema().max(100);
        }),
        clientAgentTimeSchema: hold(() => {
            return Joi.number().integer().min(0);
        }),
        clientAgentNonceSchema: hold(() => {
            return _self.base64urlSchema().max(100);
        }),
        clientOneTimeKeySchema: hold(() => {
            return _self.base64urlSchema().max(500);
        }),
        clientIdSchema: hold(() => {
            return _self.urnSchema().max(100);
        }),
        registerRequestParamsSchema: hold(() => {
            return Joi.object().unknown(false).keys({
                clientAgentId: _self.clientAgentIdSchema().required(),
                clientAgentTime: _self.clientAgentTimeSchema().required(),
                clientAgentNonce: _self.clientAgentNonceSchema().required(),
                clientOneTimeKey: _self.clientOneTimeKeySchema().required(),
            });
        }),
        registerResponseParamsSchema: hold(() => {
            return Joi.object().unknown(false).keys({
                clientAgentId: _self.clientAgentIdSchema().required(),
                clientAgentTime: _self.clientAgentTimeSchema().required(),
                clientAgentNonce: _self.clientAgentNonceSchema().required(),
                challengeToken: _self.jwtSchema().max(1500).required(),
                challengeResponse: _self.base64urlSchema().max(500).required(),
            });
        }),
        tokenRequestParamsSchema: hold(() => {
            return Joi.object().unknown(false).keys({
                clientAgentId: _self.clientAgentIdSchema().required(),
                clientAgentTime: _self.clientAgentTimeSchema().required(),
                clientAgentNonce: _self.clientAgentNonceSchema().required(),
                clientId: _self.clientIdSchema().required(),
            });
        }),
        tokenResponseParamsSchema: hold(() => {
            return Joi.object().unknown(false).keys({
                clientAgentId: _self.clientAgentIdSchema().required(),
                clientAgentTime: _self.clientAgentTimeSchema().required(),
                clientAgentNonce: _self.clientAgentNonceSchema().required(),
                challengeToken: _self.jwtSchema().max(1500).required(),
                challengeResponse: _self.base64urlSchema().max(500).required(),
            });
        }),
        tryPromise: (async (promise) => {
            return await promise.then((value) => {
                return { error: null, value };
            }, (error) => {
                return { error, value: null };
            });
        }),
        arrayBufferFromBase64url: ((base64url) => {
            return new Uint8Array(Buffer.from(base64url, 'base64url')).buffer;
        }),
        base64urlFromArrayBuffer: ((arrayBuffer) => {
            return Buffer.from(arrayBuffer).toString('base64url');
        }),
        randomBytes: ((length) => {
            return webcrypto.getRandomValues(new Uint8Array(length)).buffer;
        }),
        decodeClientOneTimePublicKey: (async (arrayBuffer) => {
            return await webcrypto.subtle.importKey('spki', arrayBuffer, {
                name: 'ECDH',
                namedCurve: 'P-521',
            }, true, ['deriveKey']);
        }),
        createIV: (() => {
            return _self.randomBytes(12);
        }),
        createServerOneTimeKeyPair: (async () => {
            return await webcrypto.subtle.generateKey({
                name: 'ECDH',
                namedCurve: 'P-521',
            }, true, ['deriveKey']);
        }),
        encodeServerOneTimePrivateKey: (async (privateKey) => {
            return await webcrypto.subtle.exportKey('pkcs8', privateKey);
        }),
        encodeServerOneTimePublicKey: (async (publicKey) => {
            return await webcrypto.subtle.exportKey('spki', publicKey);
        }),
        createRegisterChallengeToken: (async ({ clientOneTimeKey, iv, serverOneTimeKey }) => {
            return await new Promise((resolve, reject) => {
                jsonwebtokenSign({
                    clientOneTimeKey,
                    iv,
                    serverOneTimeKey,
                }, _options.idpRegisterPrivateKey(), {
                    algorithm: 'ES512',
                    issuer: _options.idpRegisterUrn(),
                    audience: _options.idpRegisterUrn(),
                    expiresIn: +60,
                    notBefore: -60,
                    jwtid: cryptoRandomUUID({ disableEntropyCache: true }),
                }, (error, encoded) => {
                    if (error != null || encoded == null) {
                        reject(error);
                        return;
                    }
                    resolve(encoded);
                });
            });
        }),
        parseRegisterChallengeToken: (async (string) => {
            return await new Promise((resolve, reject) => {
                jsonwebtokenVerify(string, _options.idpRegisterPublicKey(), {
                    algorithms: ['ES512'],
                    issuer: _options.idpRegisterUrn(),
                    audience: _options.idpRegisterUrn(),
                    complete: true,
                }, (error, decoded) => {
                    if (error != null || decoded == null) {
                        reject(error);
                        return;
                    }
                    /** @type {any} */
                    const payload = decoded.payload;
                    resolve(payload);
                });
            });
        }),
        decodeServerOneTimePrivateKey: (async (arrayBuffer) => {
            return await webcrypto.subtle.importKey('pkcs8', arrayBuffer, {
                name: 'ECDH',
                namedCurve: 'P-521',
            }, false, ['deriveKey']);
        }),
        deriveOneTimeSharedKey: (async (publicKey, privateKey) => {
            return await webcrypto.subtle.deriveKey({
                name: 'ECDH',
                public: publicKey,
            }, privateKey, {
                name: 'AES-GCM',
                length: 256,
            }, true, ['encrypt', 'decrypt']);
        }),
        decryptClientPublicKeyData: (async (iv, sharedKey, data) => {
            return await webcrypto.subtle.decrypt({
                name: 'AES-GCM',
                iv,
            }, sharedKey, data);
        }),
        decodeClientPublicKey: (async (arrayBuffer) => {
            return await webcrypto.subtle.importKey('spki', arrayBuffer, {
                name: 'ECDSA',
                namedCurve: 'P-521',
            }, false, ['verify']);
        }),
        createClientId: (async () => {
            return `urn:public:client:${cryptoRandomUUID()}`;
        }),
        createChallenge: (() => {
            return _self.randomBytes(48);
        }),
        createChallengeToken: (async ({ clientId, challenge }) => {
            return await new Promise((resolve, reject) => {
                jsonwebtokenSign({
                    clientId,
                    challenge,
                }, _options.idpChallengeTokenPrivateKey(), {
                    algorithm: 'ES512',
                    issuer: _options.idpChallengeTokenUrn(),
                    audience: _options.idpTokenUrn(),
                    expiresIn: +60,
                    notBefore: -60,
                    jwtid: cryptoRandomUUID({ disableEntropyCache: true }),
                }, (error, encoded) => {
                    if (error != null || encoded == null) {
                        reject(error);
                        return;
                    }
                    resolve(encoded);
                });
            });
        }),
        parseChallengeToken: (async (string) => {
            return await new Promise((resolve, reject) => {
                jsonwebtokenVerify(string, _options.idpChallengeTokenPublicKey(), {
                    algorithms: ['ES512'],
                    issuer: _options.idpChallengeTokenUrn(),
                    audience: _options.idpTokenUrn(),
                    complete: true,
                }, (error, decoded) => {
                    if (error != null || decoded == null) {
                        reject(error);
                        return;
                    }
                    /** @type {any} */
                    const payload = decoded.payload;
                    resolve(payload);
                });
            });
        }),
        verifyChallengeResponse: (async (publicKey, challengeResponse, challenge) => {
            return await webcrypto.subtle.verify({
                name: 'ECDSA',
                hash: {
                    name: 'SHA-512',
                },
            }, publicKey, challengeResponse, challenge);
        }),
        createToken: (async ({ clientId }) => {
            return await new Promise((resolve, reject) => {
                jsonwebtokenSign({
                    clientId
                }, _options.idpTokenPrivateKey(), {
                    algorithm: 'ES384',
                    issuer: _options.idpTokenUrn(),
                    audience: _options.apiUrn(),
                    expiresIn: +3600,
                    notBefore: -60,
                    jwtid: cryptoRandomUUID({ disableEntropyCache: true }),
                }, (error, encoded) => {
                    if (error != null || encoded == null) {
                        reject(error);
                        return;
                    }
                    resolve(encoded);
                });
            });
        }),
        asyncLock: hold(() => {
            return new AsyncLock({});
        }),
    });

    /** @type {import('.').Ipp5TokenIssuer.Self} */
    const self = ({
        ...Base({}),
        _Ipp5TokenIssuer: (() => {
            return _self;
        }),
        registerRequest: (async (params) => {
            const validationResult = _self.registerRequestParamsSchema().validate({
                clientAgentId: params.clientAgentId,
                clientAgentTime: params.clientAgentTime,
                clientAgentNonce: params.clientAgentNonce,
                clientOneTimeKey: params.clientOneTimeKey,
            });
            if (validationResult.error != null || validationResult.value == null) {
                return { error: validationResult.error, challengeToken: null };
            }
            const clientOneTimeKey = validationResult.value.clientOneTimeKey;
            const clientOneTimePublicKeyData = _self.arrayBufferFromBase64url(clientOneTimeKey);
            const decodeResult = await _self.tryPromise(_self.decodeClientOneTimePublicKey(clientOneTimePublicKeyData));
            if (decodeResult.error != null || decodeResult.value == null) {
                return { error: decodeResult.error, challengeToken: null };
            }
            return await _self.asyncLock().acquire(clientOneTimeKey, async () => {
                const existingPendingItem = await _options.pendingItemStorage().get(clientOneTimeKey);
                if (existingPendingItem != null) {
                    return { error: { name: 'Error', message: `Conflict: ${clientOneTimeKey}` }, challengeToken: null };
                }
                const iv = _self.createIV();
                const serverOneTimeKeyPair = await _self.createServerOneTimeKeyPair();
                const serverOneTimePrivateKeyData = await _self.encodeServerOneTimePrivateKey(serverOneTimeKeyPair.privateKey);
                const serverOneTimePublicKeyData = await _self.encodeServerOneTimePublicKey(serverOneTimeKeyPair.publicKey);
                const challengeToken = await _self.createRegisterChallengeToken({
                    clientOneTimeKey,
                    iv: _self.base64urlFromArrayBuffer(iv),
                    serverOneTimeKey: _self.base64urlFromArrayBuffer(serverOneTimePublicKeyData),
                });
                await _options.pendingItemStorage().set(clientOneTimeKey, {
                    clientAgentId: validationResult.value.clientAgentId,
                    clientAgentTime: validationResult.value.clientAgentTime,
                    clientAgentNonce: validationResult.value.clientAgentNonce,
                    clientOneTimeKey,
                    clientOneTimePublicKeyData,
                    serverOneTimePrivateKeyData,
                });
                return { error: null, challengeToken };
            });
        }),
        registerResponse: (async (params) => {
            const validationResult = _self.registerResponseParamsSchema().validate({
                clientAgentId: params.clientAgentId,
                clientAgentTime: params.clientAgentTime,
                clientAgentNonce: params.clientAgentNonce,
                challengeToken: params.challengeToken,
                challengeResponse: params.challengeResponse,
            });
            if (validationResult.error != null || validationResult.value == null) {
                return { error: validationResult.error, clientId: null };
            }
            const parseResult = await _self.tryPromise(_self.parseRegisterChallengeToken(validationResult.value.challengeToken));
            if (parseResult.error != null || parseResult.value == null) {
                return { error: parseResult.error, clientId: null };
            }
            const challengeTokenPayload = parseResult.value;
            const clientOneTimeKey = challengeTokenPayload.clientOneTimeKey;
            return await _self.asyncLock().acquire(clientOneTimeKey, async () => {
                const pendingItem = await _options.pendingItemStorage().get(clientOneTimeKey);
                if (pendingItem == null) {
                    return { error: { name: 'Error', message: `NotFound: ${clientOneTimeKey}` }, clientId: null };
                }
                const clientOneTimePublicKey = await _self.decodeClientOneTimePublicKey(pendingItem.clientOneTimePublicKeyData);
                const serverOneTimePrivateKey = await _self.decodeServerOneTimePrivateKey(pendingItem.serverOneTimePrivateKeyData);
                const iv = _self.arrayBufferFromBase64url(challengeTokenPayload.iv);
                const encryptedClientPublicKeyData = _self.arrayBufferFromBase64url(validationResult.value.challengeResponse);
                const deriveKeyResult = await _self.tryPromise(_self.deriveOneTimeSharedKey(clientOneTimePublicKey, serverOneTimePrivateKey));
                if (deriveKeyResult.error != null || deriveKeyResult.value == null) {
                    return { error: deriveKeyResult.error, clientId: null };
                }
                const oneTimeSharedKey = deriveKeyResult.value;
                const decryptResult = await _self.tryPromise(_self.decryptClientPublicKeyData(iv, oneTimeSharedKey, encryptedClientPublicKeyData));
                if (decryptResult.error != null || decryptResult.value == null) {
                    return { error: decryptResult.error, clientId: null };
                }
                const clientPublicKeyData = decryptResult.value;
                const decodeResult = await _self.tryPromise(_self.decodeClientPublicKey(clientPublicKeyData));
                if (decodeResult.error != null || decodeResult.value == null) {
                    return { error: decodeResult.error, clientId: null };
                }
                const clientId = await _self.createClientId();
                await _options.registeredItemStorage().set(clientId, {
                    clientAgentId: validationResult.value.clientAgentId,
                    clientAgentTime: validationResult.value.clientAgentTime,
                    clientAgentNonce: validationResult.value.clientAgentNonce,
                    clientId,
                    clientPublicKeyData,
                });
                await _options.pendingItemStorage().remove(pendingItem.clientOneTimeKey);
                return { error: null, clientId };
            });
        }),
        tokenRequest: (async (params) => {
            const paramsValidationResult = _self.tokenRequestParamsSchema().validate({
                clientAgentId: params.clientAgentId,
                clientAgentTime: params.clientAgentTime,
                clientAgentNonce: params.clientAgentNonce,
                clientId: params.clientId,
            });
            if (paramsValidationResult.error != null || paramsValidationResult.value == null) {
                return { error: paramsValidationResult.error, challengeToken: null };
            }
            const clientId = paramsValidationResult.value.clientId;
            return await _self.asyncLock().acquire(clientId, async () => {
                const registeredItem = await _options.registeredItemStorage().get(clientId);
                if (registeredItem == null) {
                    return { error: { name: 'Error', message: `NotFound: ${clientId}`, }, challengeToken: null };
                }
                const challenge = _self.createChallenge();
                const challengeToken = await _self.createChallengeToken({
                    clientId,
                    challenge: _self.base64urlFromArrayBuffer(challenge),
                });
                return { error: null, challengeToken };
            });
        }),
        tokenResponse: (async (params) => {
            const validationResult = _self.tokenResponseParamsSchema().validate({
                clientAgentId: params.clientAgentId,
                clientAgentTime: params.clientAgentTime,
                clientAgentNonce: params.clientAgentNonce,
                challengeToken: params.challengeToken,
                challengeResponse: params.challengeResponse,
            });
            if (validationResult.error != null || validationResult.value == null) {
                return { error: validationResult.error, token: null };
            }
            const parseResult = await _self.tryPromise(_self.parseChallengeToken(validationResult.value.challengeToken));
            if (parseResult.error != null || parseResult.value == null) {
                return { error: parseResult.error, token: null };
            }
            const challengeTokenPayload = parseResult.value;
            const clientId = challengeTokenPayload.clientId;
            return await _self.asyncLock().acquire(clientId, async () => {
                const registeredItem = await _options.registeredItemStorage().get(clientId);
                if (registeredItem == null) {
                    return { error: { name: 'Error', message: `NotFound: ${clientId}`, }, token: null };
                }
                const clientPublicKey = await _self.decodeClientPublicKey(registeredItem.clientPublicKeyData);
                const challengeResponse = _self.arrayBufferFromBase64url(validationResult.value.challengeResponse);
                const challenge = _self.arrayBufferFromBase64url(challengeTokenPayload.challenge);
                const verifyResult = await _self.tryPromise(_self.verifyChallengeResponse(clientPublicKey, challengeResponse, challenge));
                if (verifyResult.error != null || verifyResult.value !== true) {
                    return { error: verifyResult.error, token: null };
                }
                const tokenSignResult = await _self.tryPromise(_self.createToken({ clientId }));
                if (tokenSignResult.error != null || tokenSignResult.value == null) {
                    return { error: tokenSignResult.error, token: null };
                }
                const token = tokenSignResult.value;
                return { error: null, token };
            });
        }),
    });

    return self;

});

/** @type {import('.').Ipp5TokenIssuer.Companion} */
const companion = ({});

/** @type {import('.').Ipp5TokenIssuer.ConstructorWithCompanion} */
const constructorWithCompanion = Object.assign(constructor, companion);

export { constructorWithCompanion as Ipp5TokenIssuer };
