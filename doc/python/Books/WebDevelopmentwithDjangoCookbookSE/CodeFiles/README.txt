Thank you for reading "Web Development with Django Cookbook - Second Edition" by Aidas Bendoraitis.

This directory contains code for each chapter. To test any chapter follow these steps:

1. Create a virtual environment for a chapter (in a directory which path contains no spaces), then activate it:

    $ mkdir chapter3_env
    $ cd chapter3_env/
    $ virtualenv --system-site-packages .
    $ source bin/activate
    
2. Create a directory "project" and extract the chapter's code there:

    (chapter3_env)$ mkdir project
    (chapter3_env)$ cd project/
    (chapter3_env)$ unzip path/to/B04912_03_Code.zip
    
3. Change to the unzipped directory and install pip requirements from requirements.txt (or requirements/dev.txt):

    (chapter3_env)$ cd django-myproject-03/
    (chapter3_env)$ pip install -r requirements.txt
    
4. Run local webserver:

    (chapter3_env)$ python manage.py runserver
    
5. Follow the instructions in the README.md in the extracted project code.

6. Deactivate the virtual environment

    (chapter3_env)$ deactivate
