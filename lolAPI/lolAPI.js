//Feather for League of Legends API
module.exports = function feather(bot, info)
{
  "use strict";
  //feather obj
  const feather = {};
  //requires
  const request = require('request');
  const urlencode = require("urlencode");
  //data
  feather.champs = require('./champs.json');
  feather.gameType = require('./game_type.json');

  //feather functions
  //gets a summoner ID from a string
  feather.getSummonerID = function(summoner)
  {
    return new Promise((resolve, reject) =>
    {
      summoner = summoner.toLowerCase();
      console.log(feather.config);
      let nameURL = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${urlencode(summoner)}?api_key=${feather.config.token}`;
      request({url: nameURL, json:true}, (error, response, body) =>
      {
        
        if(!error && response.statusCode === 200)
        {
          resolve(body[summoner].id);
        }
        else
        {
          reject(`${error} and a response code of ${response.statusCode}`);
        }
      });
    });
  }
  //gets the current game from a Summoner ID
  feather.getCurrentGame = function(sID)
  {
    return new Promise((resolve, reject) =>
    {
      let url = `https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/${sID}?api_key=${feather.config.token}`;
      request({url: url, json: true}, (error, response, body) =>
      {
        if(!error && response.statusCode === 200)
        {
          resolve(body); 
        }
        else
        {
          reject(`${error} and a response code of ${response.statusCode}`);
        }
      });
    });
  }
  //gets the ranks of everyone in a game, returns an object with the id as a key
  feather.getRanks = function(idStr)
  {
    return new Promise((resolve, reject) =>
    {
      let url = `https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/${idStr}/entry?api_key=${feather.config.token}`
      request({url: url, json: true}, (error, response, body) =>
      {
        if(!error && response.statusCode === 200)
        {
          resolve(body);
        }
        else
        {
          reject(`${error} and a response code of ${response.statusCode}`);
        }
      });
    });
  }
  return feather;
};
