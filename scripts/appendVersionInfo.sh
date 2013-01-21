#!/bin/bash

APP_NAME="analyseApp"
SHA=`git rev-parse HEAD`
DATE=`date`
VERSION_INFO="$APP_NAME.version={GIT_SHA:'$SHA',BUILD_DATE:'$DATE'};"
echo $VERSION_INFO >> app/scripts/analyse.js