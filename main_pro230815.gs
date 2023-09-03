
function market_rate(ticker)
{
  try  // Trying Poloniex
   {
     rateinPoloniex(ticker)
   }
  catch(e)
  {
        try // Trying Bitstamp
        {
          rateinBitstamp(ticker)
        }
        catch(err)
        {
            try // Trying Luno
            {
              rateinLuno(ticker)
            }
            catch(err) // if noting works
            {
                return "Lost of Connection";
            }
        }
  }
}


function rateinPoloniex(ticker)
{
      var response = UrlFetchApp.fetch("https://poloniex.com/public?command=returnTicker");
      var json = JSON.parse(response.getContentText());
      if ( ticker == "BTCUSD" ) {
        var rate1 = json.USDT_BTC.last;
        return rate1;
      } else if ( ticker == "ETHUSD" ) {
        var rate2 = json.USDT_ETH.last;
        return rate2;
      } else if ( ticker == "BCHUSD" ) {
        var rate3 = json.USDT_BCH.last;
        return rate3;
      } else { return 1; }
      
      if(response.getResponseCode() === 403 || response.getResponseCode() === 500) {
        return 0;
      }
}


function rateinLuno(ticker)
{
  if ( ticker == "BTCUSD" ) {
    var response = UrlFetchApp.fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR");
    var json = JSON.parse(response.getContentText());
    var rate1 = json.last_trade
    return rate1;
  } else 
  if ( ticker == "ETHUSD" ) {
    var response = UrlFetchApp.fetch("https://api.luno.com/api/1/ticker?pair=ETHMYR");
    var json = JSON.parse(response.getContentText());
    var rate2 = json.last_trade
    return rate2;
  } else 
  if ( ticker == "BCHUSD" ) {
    var response = UrlFetchApp.fetch("https://api.luno.com/api/1/ticker?pair=LTCMYR");
    var json = JSON.parse(response.getContentText());
    var rate3 = json.last_trade
    return rate3;
  } 
  else { 
    return 1; 
    }

  if(response.getResponseCode() === 403 || response.getResponseCode() === 500) {
    return 0;
  }  
}

function rateinBitstamp(ticker)
{
  var response = UrlFetchApp.fetch("https://www.bitstamp.net/api/v2/ticker/");
  var json = JSON.parse(response.getContentText());
  
      if ( ticker == "BTCUSD" ) {
        var rate1 = checkBitStampObject_(json,"BTC/USDT")
        return rate1;
      } else if ( ticker == "ETHUSD" ) {
        var rate2 = checkBitStampObject_(json,"ETH/USDT")
        return rate2;
      } else if ( ticker == "BCHUSD" ) {
        var rate3 = checkBitStampObject_(json,"BCH/USD")
        return rate3;
      } else { return 1; }

      if(response.getResponseCode() === 403 || response.getResponseCode() === 500) {
        return 0;
      }  
}

function checkBitStampObject_(arrayOfObjects,targetPair)
{
  let lastValue = null
  for (var i = 0; i < arrayOfObjects.length; i++) {
    var obj = arrayOfObjects[i];
    if (obj.pair === targetPair) {
      console.log(obj)
      lastValue = obj.last;
      console.log(lastValue)
      return lastValue
    }
  }
}
