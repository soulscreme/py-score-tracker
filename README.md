# Py Score Tracker

## Purpose

Py score tracker is meant as a publicly displayed arcade high score tracking platform.  Unlike other platforms Py Score Tracker is lightweight and meant to be run on modest hardware attached directly to a screen.  The main display UI has also been optimized for CRT output.  The main target scenario is to run using a Raspberry Pi Zero attached directly to a CRT monitor.

## Stack
- Flask
- tinydb
- React 

## Setup
**(This is super in progress/dirty)**
Start by cloning the project to your device.  Ensure that Node and Python are both installed.  You can follow [this guide](https://www.reddit.com/r/dakboard/comments/fgiqn3/setup_a_raspberry_pi_zero_w_to_run_a_web_browser/) to setting up kiosk mode on the Pi Zero.  Here is an example `~/.profile` used for ensuring the server is started before X starts and loads the browser.  Your browser should point to `http://localhost:3000/#/display`

```
if [ ``ps aux | grep "flask run" | wc -l`` -lt 2 ]; then
	echo "Starting flask..."
	(cd /home/pi/py-score-tracker/py-score-tracker-backend && FLASK_APP=scoreApi.py flask run --host=0.0.0.0 > log.txt 2>&1 &)
fi
if [ ``ps aux | grep "bin/yarn.js start" | wc -l`` -lt 2 ]; then
	echo "Starting react..."
	(cd /home/pi/py-score-tracker/score-tracker-react-ui && PORT=3000 serve build/ > log.txt 2>&1 &)
fi

WAIT_COUNTER=0

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:3000/#/display)" != "200" ]]; do
	echo "Score tracker not ready yet..."
	let WAIT_COUNTER++

	if [[ "$WAIT_COUNTER" -le 6 ]]; then
		sleep 30;
	else
		echo "Ending wait, server didn't come up in 6 loops."
		break;
	fi
done

[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor
```
## Pages

`/#/display`  - Basic display screen, automatically rotates between a list of the highest scores in all games and individual game leader boards.

`/#/admin` - Allows you to add, edit, or delete scores.

`/#/post_public` - This is a mobile friendly page that users can use to upload scores.  Can be posted as a QR code.
