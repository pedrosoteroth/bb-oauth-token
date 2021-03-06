const request = require('request-promise');
const {
    getPropertiesS3,
} = require('brcap-utils');

async function BBOauthToken() {
    const properties = await getPropertiesS3('brasilcap-properties-dev', [{
        chave: 'PropertiesAWS',
        valor: 'pgt-api',
    }]);

    const username = properties.PropertiesAWS.client_id;
    const password = properties.PropertiesAWS.client_secret;
    const url = properties.PropertiesAWS.endPointOAuthBB;
    const registrationAccessToken = properties.PropertiesAWS.appKeyBB;
    const response = await request.post(url, {
        auth: {
            username,
            password,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${registrationAccessToken}`,
        },
        form: {
            grant_type: 'client_credentials',
            scope: 'seguridade.incluir-pagamento',
        },
    });

    return JSON.parse(response);
}

module.exports = {
    BBOauthToken,
};