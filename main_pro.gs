
function market_rate(ticker) {

  var sn3 = "TXRX";
  var ss3 = SpreadsheetApp.openById(ssId).getSheetByName(sn3) ? SpreadsheetApp.openById(ssId).getSheetByName(sn3) : SpreadsheetApp.openById(ssId).insertSheet(sn3);  
  var ticker = ticker;
  if (typeof(ss3.getRange("L9").getDisplayValue().split(":")[1]) == "undefined") {
    var sourceroute = "";
  } else { 
    var sourceroute = ss3.getRange("L9").getDisplayValue().split(":")[1]; 
  }
  if ( ss3.getRange("L9").getDisplayValue().split(":")[0] != 0 ) {
    ss3.getRange("L9").setValue(["0:"+sourceroute]);
  }

  switch (ss3.getRange("L9").getDisplayValue().split(":")[1]) {
    case "POLONIEX":
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        rateinPoloniex(ticker);
      }
      break;
    
    case "BITSTAMP":
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        rateinBitstamp(ticker);
      }
      break;

    case "LUNO":
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        rateinLuno(ticker);
      }
      break;

    default:
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        rateinPoloniex(ticker);
      }
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        rateinBitstamp(ticker);
      }
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        rateinLuno(ticker);
      }
      if ( ss3.getRange("L9").getDisplayValue().split(":")[0] == 0 ) {
        sendText(fromid, "Lost of all Connections!");
      }
  }
}


function rateinPoloniex(ticker) {
  var sn3 = "TXRX";
  var ss3 = SpreadsheetApp.openById(ssId).getSheetByName(sn3) ? SpreadsheetApp.openById(ssId).getSheetByName(sn3) : SpreadsheetApp.openById(ssId).insertSheet(sn3);
  if (typeof(ss3.getRange("L9").getDisplayValue().split(":")[1]) == "undefined") {
    var sourceroute = "";
  } else { 
    var sourceroute = ss3.getRange("L9").getDisplayValue().split(":")[1]; 
  }
  try {
    var response = UrlFetchApp.fetch("https://poloniex.com/public?command=returnTicker");
    var json = JSON.parse(response.getContentText());
    if ( ticker == "BTCUSD" ) {
      var rate1 = json.USDT_BTC.last;
      ss3.getRange("L1").setValue(["Route by POLONIEX"]);
      ss3.getRange("L2").setValue([Number(rate1)]);
      ss3.getRange("L2").setFormula('=' + ss3.getRange("L2").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate1;
    } else if ( ticker == "ETHUSD" ) {
      var rate2 = json.USDT_ETH.last;
      ss3.getRange("L1").setValue(["Route by POLONIEX"]);
      ss3.getRange("L3").setValue([Number(rate2)]);
      ss3.getRange("L3").setFormula('=' + ss3.getRange("L3").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate2;
    } else if ( ticker == "BCHUSD" ) {
      var rate3 = json.USDT_BCH.last;
      ss3.getRange("L1").setValue(["Route by POLONIEX"]);
      ss3.getRange("L4").setValue([Number(rate3)]);
      ss3.getRange("L4").setFormula('=' + ss3.getRange("L4").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate3;
    } else { return 1; }

    if( response.getResponseCode() === 403 || response.getResponseCode() === 500 ) {
      sendText(fromid, "Poloniex server is down!!");
      return 0;
    }
  } catch(e) {
      sendText(fromid, "Poloniex server is down!");
      ss3.getRange("L9").setValue(["0:"+sourceroute]);
  }
}


function rateinLuno(ticker) {
  var sn3 = "TXRX";
  var ss3 = SpreadsheetApp.openById(ssId).getSheetByName(sn3) ? SpreadsheetApp.openById(ssId).getSheetByName(sn3) : SpreadsheetApp.openById(ssId).insertSheet(sn3);
  if (typeof(ss3.getRange("L9").getDisplayValue().split(":")[1]) == "undefined") {
    var sourceroute = "";
  } else { 
    var sourceroute = ss3.getRange("L9").getDisplayValue().split(":")[1]; 
  }
  try {
    if ( ticker == "BTCUSD" ) {
      var response = UrlFetchApp.fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR");
      var json = JSON.parse(response.getContentText());
      var rate1 = json.last_trade;
      ss3.getRange("L1").setValue(["Route by LUNO"]);
      ss3.getRange("L2").setValue([Number(rate1)/Number(ss3.getRange("B2").getValue())]);
      ss3.getRange("L2").setFormula('=' + ss3.getRange("L2").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate1;
    } else 
    if ( ticker == "ETHUSD" ) {
      var response = UrlFetchApp.fetch("https://api.luno.com/api/1/ticker?pair=ETHMYR");
      var json = JSON.parse(response.getContentText());
      var rate2 = json.last_trade;
      ss3.getRange("L1").setValue(["Route by LUNO"]);
      ss3.getRange("L3").setValue([Number(rate2)/Number(ss3.getRange("B2").getValue())]);
      ss3.getRange("L3").setFormula('=' + ss3.getRange("L3").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate2;
    } else 
    if ( ticker == "BCHUSD" ) {
      var response = UrlFetchApp.fetch("https://api.luno.com/api/1/ticker?pair=BCHMYR");
      var json = JSON.parse(response.getContentText());
      var rate3 = json.last_trade;
      ss3.getRange("L1").setValue(["Route by LUNO"]);
      ss3.getRange("L4").setValue([Number(rate3)/Number(ss3.getRange("B2").getValue())]);
      ss3.getRange("L4").setFormula('=' + ss3.getRange("L4").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate3;
    } 
    else { 
      return 1; 
      }

    if(response.getResponseCode() === 403 || response.getResponseCode() === 500) {
      sendText(fromid, "Luno server is down!!");
      return 0;
    }
  } catch(e) {
    sendText(fromid, "Luno server is down!");
    ss3.getRange("L9").setValue(["0:"+sourceroute]);
  }
}


function rateinBitstamp(ticker) {
  var sn3 = "TXRX";
  var ss3 = SpreadsheetApp.openById(ssId).getSheetByName(sn3) ? SpreadsheetApp.openById(ssId).getSheetByName(sn3) : SpreadsheetApp.openById(ssId).insertSheet(sn3);
  if (typeof(ss3.getRange("L9").getDisplayValue().split(":")[1]) == "undefined") {
    var sourceroute = "";
  } else { 
    var sourceroute = ss3.getRange("L9").getDisplayValue().split(":")[1]; 
  }
  try {
    var response = UrlFetchApp.fetch("https://www.bitstamp.net/api/v2/ticker/");
    var json = JSON.parse(response.getContentText());
    
    if ( ticker == "BTCUSD" ) {
      var rate1 = checkBitStampObject_(json,"BTC/USDT");
      ss3.getRange("L1").setValue(["Route by BITSTAMP"]);
      ss3.getRange("L2").setValue([Number(rate1)]);
      ss3.getRange("L2").setFormula('=' + ss3.getRange("L2").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate1;
    } else if ( ticker == "ETHUSD" ) {
      var rate2 = checkBitStampObject_(json,"ETH/USDT");
      ss3.getRange("L1").setValue(["Route by BITSTAMP"]);
      ss3.getRange("L3").setValue([Number(rate2)]);
      ss3.getRange("L3").setFormula('=' + ss3.getRange("L3").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate2;
    } else if ( ticker == "BCHUSD" ) {
      var rate3 = checkBitStampObject_(json,"BCH/USD");
      ss3.getRange("L1").setValue(["Route by BITSTAMP"]);
      ss3.getRange("L4").setValue([Number(rate3)]);
      ss3.getRange("L4").setFormula('=' + ss3.getRange("L4").getDisplayValue() + '*B2');
      ss3.getRange("L9").setValue(["1:"+sourceroute]);
      return rate3;
    } else { return 1; }

    if(response.getResponseCode() === 403 || response.getResponseCode() === 500) {
      sendText(fromid, "Bitstamp server is down!!");
      return 0;
    }
  } catch(e) {
      sendText(fromid, "Bitstamp server is down!");
      ss3.getRange("L9").setValue(["0:"+sourceroute]);
    }
}

      function checkBitStampObject_(arrayOfObjects,targetPair)
      {
        let lastValue = null;
        for (var i = 0; i < arrayOfObjects.length; i++) {
          var obj = arrayOfObjects[i];
          if (obj.pair === targetPair) {
            console.log(obj);
            lastValue = obj.last;
            console.log(lastValue);
            return lastValue;
          }
        }
      }
