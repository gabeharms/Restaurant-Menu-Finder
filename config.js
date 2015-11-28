var config = {};

config.mongoUri = 'mongodb://localhost:27017/rtr';
config.cookieMaxAge = 30 * 24 * 3600 * 1000;
config.secretKey = "dfJrioUDOR3wCXb3cIQMOJzPIuB891xbsyYLHjdn";
config.clientKey = "M2JiMzNlOWFiMWJmNTYxMjM3M2E3NDg1NmU5MzhhYmIy";
config.target = "sandbox.delivery.com";
config.searchPath = "/merchant/search/pickup"
config.menuPath = "/merchant/"
config.address = {
    street: "1455 Coventry Dr",
    city: "Hanover",
    zip: "21076",
    state: "MD"
};
module.exports = config;