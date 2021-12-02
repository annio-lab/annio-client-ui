#!/usr/bin/env bash

CMD=$2
: ${CMD:=/bin/bash}

docker start annio-client-ui-dev
docker exec -it annio-client-ui-dev ${CMD}
