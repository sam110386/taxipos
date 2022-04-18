var Constants = {};
var token = "dqhJuH1ZI4ItIMOcDoH3Lf7YFWTpeC0j";
var appUrl = process.env.REACT_APP_API_URL; //"http://localhost/TAXITECH/DriveItAwayUpgrade"; // DEVELOPMENT

//var appUrl = "http://app.sylc-export.com/api/v1/index.php"; // STAGING
//var appUrl = "http://localhost/TAXITECH/DriveItAwayUpgrade"; // PRODUCTION

Constants.APP_URL = appUrl;
//Constants.API_ENDPOINT= appUrl + "/web_api/v1.0/?token="+token;
Constants.API_ENDPOINT = appUrl + "/posapi/v1.1/";
Constants.API_AUTH_TOKEN = token;

Constants.SITE_TITLE = "Taxitech";

Constants.DEFAULT_PAGE_TITLE = "Taxitech";
Constants.CURRENCY_CODE = "USD";
// Constants.CURRENCY_SYMBLE= "€";
Constants.PREFIX_CURRENCY_SYMBLE = "$";
Constants.CURRENCY_SYMBLE = "USD";

module.exports = Constants;
