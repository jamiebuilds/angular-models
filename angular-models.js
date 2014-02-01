angular.module('tjk.models', [])

  .factory('ObjectModel', ['$rootScope', function ($rootScope) {
    return {
      defaults: {},
      calculatedProperties: {},

      extend: function (object) {
        return _.extend(this, object, { current: {} });
      },

      create: function (data) {
        var self = this;

        this.current = data;
        this.current = _.defaults(this.current, this.defaults);

        _.each(this.calculatedProperties, function (definition, prop) {
          self.bindProperty( prop, _.first(definition), _.rest(definition) );
        });

        return this.current;
      },

      bindProperty: function (prop, fn, bindings) {
        var self = this;

        $rootScope.$watchCollection(function () {
          return _.map(bindings, function (binding) {
            return self.current[ binding ];
          });
        }, function (values) {
          self.current[ prop ] = fn.apply(self.current, values);
        })
      }
    };
  }]);
