#!/bin/bash

PWD=`pwd`

run_backend(){
        cd ./PB/PB/
        source $PWD/venv/bin/activate
        python3.10 manage.py runserver
        cd ../../
}

run_frontend(){
    cd ./app    
    npm start
    cd ../
}

run_backend &
run_frontend