# Micado app (micado)

Public Administration application

## Development instructions
To develop this application you need to execute the following command to get a proper shell in the development environment, this will mount the source folder and allow editing the code with you preferred editor while getting the benefit of having autorefresh etc.

```bash
docker-compose run pa_app_dev bash
```

### Install the dependencies
The first time you will have to install all the modules or quasar will complain.
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
docker-compose up
```
The application can be accessed both the following addresses
```bash
http://pa.micado.csi.it   [using the balancer in front of the web server as in production environment; the FQDN must be set in hosts file]
http://localhost:8080     [with hot reloading]
```

### To test the application during Development
```bash
docker exec -it pa_application_pa_app_dev_1 /bin/bash
QENV=test;NODE_ENV=test;quasar test --unit jest
```


### Build the app for production
To have a build to test locally is possible to execute the command below
```bash
docker build -t micadoproject/pa_app:0.0.1 .
```

For release the GIT repository is linked to Dockerhub so at each push a new image build will be triggered.


### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
