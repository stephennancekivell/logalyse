logalyse
========

A tool for chating arbitrary files. You can search a log file and chart different tags.

![screenshot](https://raw.github.com/stephennancekivell/logalyse/master/screenshot.png)

done
----
* Chart different tags in a log file.
* Click point on chart. navigate to log line.
* Shouldnt need date fromat and date search.
** date search can be interpereted from the date format.
** as MMM -> \w{3,3} or \w+
* Remember and guess different date formats and regex.

todo
----
* Different types of charts, line scatter plot.
* Processing icon.
* How to display big logs in in html
* Limit amount of lines. Subset of data. By date or count.
* Chart amount of lines per hour/day/month. _.groupBy
* Chart a value in the log line.

* Could be storing good previous formats in localStorage.

* Infinate scroll type log viewer. http://jsfiddle.net/vojtajina/U7Bz9/

* login. beta testers.
* Sharing, dont need to login. Upload settings etc.
* Search for tags, formats, privacy around that.
 
* Do i want a service. that takes lines, settings and spits out the chart able stuff.
* No the chart should do that.
* Chart directive.
 
* Log4j appender that uploads to my server.
* Users can register apps that each have a encryption key.
* the log4j appender uses that encryption.
* The decrypt key could be part of the app and stored in cookies or something. So the decrypt isnt stored in the log storing app.
 	
* With that this can turn the app into a powerfull analytics dashboard.
* All you need to do is start uploading logs.
* Setup some good tags.
 
* Use lesscss
