#!/bin/bash

PWD=`pwd`

start_backend(){
        cd ./PB/PB/
        python3.10 -m virtualenv -p `which python3.10` venv
        source $PWD/venv/bin/activate
        python3.10 -m pip install --upgrade pip
        python3.10 -m pip install -r requirements.txt
        python3.10 manage.py makemigrations
        python3.10 manage.py migrate
        cd ../../
}

start_frontend(){
    cd ./app    
    npm install
    cd ../
}

start_backend
start_frontend

