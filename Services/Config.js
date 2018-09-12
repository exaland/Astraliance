import WPAPI from "wpapi"

var wpApi = new WPAPI({
    endpoint: 'http://www.astraliance.fr/wp-json'
});
wpApi.horososcope = wpApi.registerRoute('horoscope/v1', '/fr/(?P<type>[^/]+)/');

export default wpApi;