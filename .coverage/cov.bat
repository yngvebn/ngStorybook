REM REM Makes sure that Istanbul command line is installed
REM call npm i nyc -g

REM Build
cd ..\
rd storybook-static /s /q
rd coverage-output /s /q
rd .nyc_output /s /q
call npm run build-storybook
cd .\.coverage

REM Reset previous instrumentation
REM xcopy ..\storybook-static ..\coverage-output\storybook-static\ /s /y
REM xcopy ..\angularapp\src ..\coverage-output\src\ /s /y

REM Instrument and serve the app
cd ..\
REM xcopy .\storybook-static\*.html .
REM xcopy .\storybook-static\*.ico .
REM xcopy .\storybook-static\*.map .
call nyc instrument ./storybook-static ./coverage-output --source-map=false --complete-copy
start docker run -it --rm -p 6006:8080 -v C:\github\ngStorybook\coverage-output:/public --name storybook danjellz/http-server

REM Run the ART and stop the server
REM cd ..\angularapp\e2e
md .\.nyc_output
call npm run cypress
docker stop storybook

REM Convert the JSON report to LCOV
cd .\coverage-output
call nyc report  --exclude-after-remap=false --cwd=. --reporter=lcov

REM Use the source-maps to remapthe lcov file to the source TS files

REM cd ..\.coverage
REM call npm i lcov-sourcemap
REM call node mapcov.js

REM REM Generate and open the html version of lcov
REM call docker run -it -v %cd%/../angularapp/node_modules:/app/node_modules -v %cd%/../coverage-output:/app kaskada/lcov /bin/sh -c "cd app && genhtml lcov-map.info"
REM start ..\coverage-output\index.html
