#!/bin/bash

# Make folders if they don't exist yet
if [ ! -d "./data" ]; then
  mkdir data
fi
if [ ! -d "./log" ]; then
  mkdir log
fi

# Start MongoDB single node instance
mongod --dbpath data --logpath log/mongod.log --logappend --fork
