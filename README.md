# Ionic 3 Testbed

An [Ionic 3](https://ionicframework.com/docs/) Testbed to test anything proper to Ionic 3 and underlying frameworks and technologies, like:
- [Sass](http://sass-lang.com/guide)
- Angular in genaral, but specifically [Angular 5](https://v5.angular.io/docs)
- [RxJS 5](https://github.com/ReactiveX/rxjs/tree/stable)
- [Ionic Native](https://ionicframework.com/docs/native/)
- Other [Cordova plugins](https://cordova.apache.org/plugins/)
- more...

## Focus

This project is an experimental testbed but I intend to use only recommended and best-practices so that it can serve as a reference repository for my other projects.

### TSLint rules

In that regard I am using the [tslint-ionic-rules](https://www.npmjs.com/package/tslint-ionic-rules) created by the Ionic Team (in strict mode), with one [TSLint configuration](https://palantir.github.io/tslint/usage/configuration/) exception (as this is a testbed):

``` json
{
  "extends": "tslint-ionic-rules/strict",
  "rules": {
    "no-console": false
  }
}
```

## Installation

No particular setup, just clone this repo and install npm dependencies.


## Licence

Feel free to fork, copy or use any part of this project but please send feedback.
