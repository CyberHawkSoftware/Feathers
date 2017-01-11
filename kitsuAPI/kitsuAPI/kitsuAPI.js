//template feather
module.exports = function feather(bot, info)
{
  "use strict";
  //feather obj
  const feather = {};
  //set variable for config
  const config = feather.config;
  //requires
  const request = require('request');
  const urlencode = require('urlencode');
  //feather functions

  feather.searchAnime = function(anime)
  {
    return new Promise((resolve, reject) =>
    {
      let url = `https://kitsu.io/api/edge/anime?filter[text]=${urlencode(anime)}`;
      request({url: url, json: false}, (error, response, body) =>
      {
        if(!error && response.statusCode === 200)
        {
          let animeResponse = JSON.parse(body);
          if(animeResponse.data.length != 0)
          {
            resolve(animeResponse);
          }
          else
          {
            reject('There were no results from that anime. Try to alter the title to get better results!');
          }
        }
        else
        {
          reject('An error has occured with that lookup, please try a different name. If the error persists, contact CyberRonin');
        }
      });
    });
  }
  return feather;
};
