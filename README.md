# web2marketprice

This task is about rewrite of existing code where poloniex.gs was working previously until two days ago hit by page not found probably due to their server busy maintenance or downtime. My bot cannot solely rely on poloniex.gs so your given task is to further strengthen my code by adding luno.gs and bitstamp.gs before my bot hits by "Lost of Connection". 

market_rate() function should have the ability to sense which ticker information is available. Not undefined. Not empty string. Not error. Always based on simplicity in mind, I thought I could have var hasread=0; and let's say it is able to pick up rate information from rateinPoloniex() then hasread=1; or else continue to pick up rate information from rateinLuno() then hasread=1 or else continue to try to pick up rate information from rateinBitstamp() before until all fail and "Lost of Connection" message is shown as last resort.


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

rateinPoloniex(ticker) {}

rateinLuno(ticker) {}

rateinBitstamp(ticker) {}

market_rate(ticker) { Ability to switch source channel }
'If rateinPoloniex() error unable to pick up rate next
'If rateinLuno() error unable to pick up rate next
'If rateinBitstamp() error unable to pick up rate next
'Last to no avail shows Connection Errors message as Lost of Connection
