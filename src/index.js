const Promise = require('bluebird');
const {
    Redis_Post,
    Redis_Get
} = require('brcap-aws');
const {
    BBOauthToken,
} = require('./service/bbOauthService');

async function getRedisToken(key) {
    await Promise.promisify(Redis_Get)(key, host, port);
}

async function newToken(key) {
    const oAuthToken = await BBOauthToken();
    await Promise.promisify(Redis_Post)(key, oAuthToken.access_token, oAuthToken.expires_in - 100, host, port);
}

async function tokenDelivery(key = '@pgt_efetua_pagamento_bb', callback) {
    let token = await getRedisToken(key);
    if (!token) {
        token = await newToken(key);
    }
    callback(null, token);
}

exports.handler = (event, context, callback) => {
    tokenDelivery(callback);
};