# fishfry
This Backend Code is builed base on Django and deployed in cloud env ( aws ) using apache2 , database sqlite is set up in project but we can have its own instance if needed 
Deploy
1. make sure you have python installed in your env
2. make sure you have apache installed in your env
3. clone proejct to your env ( you have have an issue to download directly from git clone, you may want to just download by zip file ) 
4. run "python3 -m venv env" in your project folder to create virtual env ( this only available in python3 ) 
5. run "source env/bin/activate" to activate env 
6. you can just run "python -m pip install -r requirements.txt' since it alreayd include dependend module for django project 
7. remove package-lock.json, db.sqlite3 to start clean or you can just use the database 
8. run "./manage.py migrate" to regenerate database ( you can review initial database creation and data in apps/migration/ 
9. run "python manage.py collectstatic" to generate staic file to the root static folder ( indicate in settings.py ) 
10. set up apache2 site and pointing to your project wsgi

<VirtualHost *:8080>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com
        ServerName sitename.com
        ServerAlias www.sitename.com

        ServerAdmin webmaster@sitename.com
        DocumentRoot RootFolder
        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        Alias /static Staticfolder
        <Directory Staticfolder>
                Require all granted
        </Directory>

        <Directory Appfolder>
                <Files wsgi.py>
                        Header set Access-Control-Allow-Origin "*"
                        Require all granted
                </Files>
        </Directory>
        WSGIDaemonProcess fishfry python-home=virtualenvfolder python-path=pythonProjectFOlder
        WSGIProcessGroup fishfry
        WSGIScriptAlias / Appfolder/wsgi.py
        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
11. modify ALLOWED_HOSTS to only allow certain url to access your api 
12. modify CORS_ORIGIN_ALLOW_ALL to FALSE and add CORS_ORIGIN_WHITELIST

FUNTION
THis will provide api for frontend page, thus it have quite similar structure as frontend , more detail api url will be in urls.py 
1. BOATSERVICE
_ this will provide all boatservice + Swimlane data, swimlane data will make construct the board easier and in order we want 
_ boatservice detail api will provide individual card information along with swimlane, boat and guide 
2. BOAT/GUIDE/SWIMLANE
_simple function get all data from each table and update/detele/add single item 
3. ADMIN
_this will allow you to create super user for django api to control back end user and group
4. django provide very nice view of api thus you will find it is very easy to go through each api url 
TODO
Permission authentication and database update to archive frontend todo list

