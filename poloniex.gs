
function rateinPoloniex(ticker)
{
  try {
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
  catch(e){
    return 0;
  }
}
