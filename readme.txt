Go:
1) Set the environment variables GOPATH
2) Run server using go run .

PYTHON/DJANGO:
In a GIT BASH while creating;
1) Set up a environment: conda create -n env_name python=3.8.3
2) conda env list (You'll see your new environment)
3) Activate it using the command: conda activate env_name
4) cd into the project
5) pip install mysqlclient
6) pip install -r requirements.txt
7) django-admin startproject projectname
8) cd into the project
9) run the server: python manage.py runserver

Every other time;
1) conda activate env_name
2) python manage.py runserver

React:
1) npm start

