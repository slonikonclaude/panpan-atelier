@echo off
cd /d "%~dp0"
set PORT=9855
set PROFILE=chrome-profile5
node reviews.mjs es relevant 600 > ..\maps\rv-es-relevant.log 2>&1
node reviews.mjs es newest 600 > ..\maps\rv-es-newest.log 2>&1
node reviews.mjs en relevant 400 > ..\maps\rv-en-relevant.log 2>&1
echo done > ..\maps\rv-done.txt
