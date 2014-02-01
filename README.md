angular-models
==============

Angular rich data model service

```js
angular.module('myApp', ['tjk.models'])

  .factory('ExampleModel', ['ObjectModel', function (ObjectModel) {
    return ObjectModel.extend({
      defaults: {
        foo: 0,
        bar: 0
      },

      computedProperties: {
        tah: [function (foo, bar) {
          return foo + bar;
        }, 'foo', 'bar']
      }
    });
  }])

  .controller('ExampleController', ['$scope', 'ExampleModel', function ($scope, ExampleModel) {
    $scope.model = ExampleModel.create({ foo: 12 }); // { foo: 12, bar: 0, tah: 12 }

    $scope.model.bar = 10; // $scope.model = { foo: 12, bar: 10, tah: 22 }
  }]);
```
