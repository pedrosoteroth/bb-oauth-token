const {
    BBOauthToken,
} = require('./service/bbOauthService');

async function tokenDelivery(callback) {
    const token = await BBOauthToken();
    console.log(token);
    callback(null, token);
}

exports.handler = (event, context, callback) => {
    tokenDelivery(callback);
};