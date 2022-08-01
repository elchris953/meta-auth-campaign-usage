const adsSdk = require('facebook-nodejs-business-sdk');

// Manually add access_token and ad_account
const adAccount = ''
const accessToken = '';

const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;

const account = new AdAccount(adAccount)

account
  .createCampaign(
    [Campaign.Fields.Id],
    {
      [Campaign.Fields.special_ad_categories]: ['NONE'],
      [Campaign.Fields.name]: 'Page likes campaign', // Each object contains a fields map with a list of fields supported on that object.
      [Campaign.Fields.status]: Campaign.Status.paused,
      [Campaign.Fields.objective]: Campaign.Objective.page_likes
    }
  )
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  });
