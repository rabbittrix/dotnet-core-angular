## Commands dotnet core

dotnet --version

dotnet -h

dotnet --list-sdks

dotnet new console -n (name of project)

dotnet new web -n (name of project) more simple template - return string

dotnet new mvc -n (name of project) work with model, views, controllers - return View()

dotnet new webapi -n (name of project) work with controller - return json

dotnet run

dotnet sln

dotnet add 

dotnet sln 

dotnet restore

dotnet watch run

## Entity Framework
dotnet ef migrations add InitialCreate

dotnet ef database update

dotnet tool install -g 

dotnet-aspnet-codegenerator

dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design

dotnet aspnet-codegenerator --help

dotnet aspnet-codegenerator controller -name ProApiController

rm -R <name>/name.cs (remove file)

dotnet tool install --global dotnet-ef --version 3.1.1

dotnet add package Microsoft.EntityFrameworkCore.Design

dotnet add package Microsoft.EntityFrameworkCore.SqlServer

%USERPROFILE%\.dotnet\tools

dotnet ef --startup-project ../ProApi.WebAPI migrations add init

## Command C#
ctor

ctrl .

ctrl + shift + P (:9:28)

ctrl + D

prop + tab

alt + click

## Command Angular
npm i -g @angular/cli

npm i ngx-toastr --save

ng new <name>

ng serve -o (open browser)

ng generate component xyz


## Bootstrap
npm i --save bootstrap @fortawesome/fontawesome-free

npm i ngx-bootstrap --save

# ProApiApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
