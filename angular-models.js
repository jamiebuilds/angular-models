angular.module('tjk.models', [])

  .factory('ObjectModel', ['$rootScope', function ($rootScope) {
    var ObjectModel = function (builder, object) {
      return this.initialize(builder, object);
    };

    ObjectModel.prototype = {
      initialize: function (builder, object) {
        this.builder(builder);

        this.current = _.defaults({}, object, this.defaults);

        _.each(this.computedProperties, function (value, prop) {
          this.bindProperty( prop, _.first(value), _.rest(value) );
        }, this);

        return this.current;
      },

      builder: function (builder) {
        _.each(builder, function (value, prop) {
          this[ prop ] = value;
        }, this);
      },

      destroy: function () {
        _.each(this.watchers, function (watcher) {
          this.watcher();
        }, this);

        this.watchers.length = 0;
        delete this.current;
      },

      bindProperty: function (prop, fn, bindings) {
        var self = this;

        var watcher = $rootScope.$watchCollection(function () {
          return _.map(bindings, function (binding) {
            return self.current[ binding ];
          });
        }, function (values) {
          self.current[ prop ] = fn.apply(self.current, values);
        });

        this.watchers.push(watcher);
      }
    };

    ObjectModelBuilder = function () {
      this.initialize();
    };

    ObjectModelBuilder.prototype = {
      initialize: function () {
        this.defaults = {};
        this.computedProperties = {};
        this.watchers = [];
      },

      extend: function (object) {
        return _.extend(this, object);
      },

      create: function (object) {
        return new ObjectModel(this, object);
      }
    };

    return new ObjectModelBuilder();
  }]);
