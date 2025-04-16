# Transport Simple

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Problem Statement
Create an application with the following functionality:
Input fields should be Start Point and End Point.
Design should have the first three characters of starting point and ending point
Functionality:
If it’s a continued trip (Eg. Bangalore to Chennai, Chennai to Ooty) then the straight line should be on level 1. 
If it’s not a continued trip (Eg. Bangalore to Chennai, Ooty to Bangalore) then the straight line should have an arrow and be on level 1.
If consecutive trips have the same pickup and drop location then those to be in Level 2. 
Any number of trips can be added and design should respond accordingly to adjust within the defined dimension. 

## Project hosted on 
https://rude1609.github.io/transport_simple/
