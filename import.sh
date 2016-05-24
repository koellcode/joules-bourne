#!/bin/bash

for file in $1/*
do
    curl -X POST http://localhost:3000/api/v1/activity -d "@$file" -H "Content-Type: application/vnd.garmin.tcx+xml"
done
