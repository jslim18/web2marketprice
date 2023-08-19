# web2marketprice

This task is about rewrite of existing code where poloniex.gs was working previously until two days ago hit by page not found probably due to their server busy maintenance or downtime. My bot cannot solely rely on poloniex.gs so your given task is to further strengthen my code by adding luno.gs and bitstamp.gs before my bot hits by "Lost of Connection". 

market_rate() function should have the ability to sense which ticker information is available. Always based on simplicity in mind, I thought I could have var readchannel=0; and let's say it is able to pick up rate information from rateinPoloniex() then readchannel=1; or else continue to pick up rate information from rateinLuno() then readchannel=1 or else continue to try to pick up rate information from rateinBitstamp() before all fail and "Lost of Connection" as is shown last resort.


LUNO
====

https://api.luno.com/api/1/ticker?pair=XBTMYR

https://api.luno.com/api/1/ticker?pair=ETHMYR

https://api.luno.com/api/1/ticker?pair=LTCMYR

BITSTAMP
========

https://www.bitstamp.net/api/v2/ticker/


YOUR TASK
==========

rateinPoloniex() {}

rateinLuno() {}

rateinBitstamp() {}

market_rate() { Ability to switch source channel }
'If rateinPoloniex() error next
'If rateinLuno() error next
'If rateinBitstamp() error next
'Last to no avail shows Connection Errors Lost of Connection
