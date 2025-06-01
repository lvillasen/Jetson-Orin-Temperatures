# Jetson Orin Temperature-Monitor Webpage

Monitor the temperatures of a Jetson Orin on a remote web server
home/your-user-id

Tested only on a Jetson Orin AGX 

### Instructions
- Clone the repository into the jetson and a into your remote web server

- On the jetson create a folder on /home/your-user-id/jetson and copy the file temperature.py

- On the jetson type 
``` crontab -e ```
and add this line
``` */5 * * * * /usr/bin/python3 /home/home/your-user-id/jetson/temperature.py > /home/your-user-id/cron-log.txt 2>&1 ```

- Create a folder named jetson on the web server on /var/www/html and copy the files from web-server

- On your web server create a new mySQL database with
```
CREATE DATABASE jetson;
USE jetson;

CREATE TABLE `jetson_temps` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date_time` DATETIME,
  `CPU` FLOAT,
  `Tboard` FLOAT,
  `SOC2` FLOAT,
  `Tdiode` FLOAT,
  `SOC0` FLOAT,
  `GPU` FLOAT,
  `tj` FLOAT,
  `SOC1` FLOAT,
  `date_time_rec` DATETIME
);
```
- Modify the lines marked with with XXXXX on the php files according with your credentials to access mySQL
  
- If all works well you can see the jetson temperatures on https://your-web-server-IP/jetson
     





