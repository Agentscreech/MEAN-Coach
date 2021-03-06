angular.module('App')
.factory('Log', ["$resource", function($resource){
  return $resource('/api/logs/:id', {id: '@user_id'});
}])
.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id/userSettings', {id: '@user_id'},{stripTrailingSlashes:false});
}])
  //Get all activities
  .factory('Activity', ['$http', function($http) {
    return {
      getActivities: function() {
        var URL = '/api/activities';
        var req = {
          url: URL,
          method: "GET"
        };
        return $http(req);
      }
  };
  }])

  //Delete Activity
  .factory('DeleteActivity', ['$http', function($http) {
    return {
      delete: function(deleteId) {
        var URL = '/api/logs/delete/activity/' + deleteId.user_id + "?" + deleteId._id;
        var req = {
          url: URL,
          method: "DELETE"
        }
        return $http(req);
      }
    };
  }])

  //Delete Food
  .factory('DeleteFood', ['$http', function($http) {
    return {
      delete: function(deleteId) {
        var URL = '/api/logs/delete/food/' + deleteId.user_id + "?" + deleteId._id;
        var req = {
          url: URL,
          method: "DELETE"
        }
        return $http(req);
      }
    };
  }])

  //Get activities by user search term
  .factory('ActivitySearch', ['$http', function($http) {
    return {
      search: function(serviceActivitySearch) {
        var URL = '/api/activities/search/' + serviceActivitySearch;
        var req = {
          url: URL,
          query: serviceActivitySearch,
          method: "GET"
        };
        console.log("inf factory: ", serviceActivitySearch);
        return $http(req);
    }
  };
  }])


.factory('Profile', ['$http', function($http) {
  return {
    getProfile: function(userId) {
      var URL = '/api/profile/' + userId;
      var req = {
        url: URL,
        method: "GET"
      };
      return $http(req);
    },
    getLogs: function(userId){
      var URL = '/api/logs/' +userId;
      var req = {
        url:URL,
        method: "GET"
      };
      return $http(req);
      // then(function(res){
      //   console.log('this is the response to get logs ', res.data );
        // return res.data;
      // });
    }
  };
}])

//POST new user to database, utilize Auth factory
.factory('UserService', ['$http', 'Auth', function($http, Auth) {
  return {
    createAccount: function(params) {
      var URL = '/api/users';
      var req = {
        url: URL,
        method: "POST",
        data: params
      };
      return $http(req).then(function(res) {
        if(res.status !== 200) {
          // console.log("Couldn't create user");
          return false;
        }
        // console.log("User create response: ", res.data);
        return res.data;
      }, function error(res) {
        // console.log("Error response: ", res);
        return res;
      });
    },
    login: function(params) {
      var req = {
        url: '/api/auth',
        method: 'POST',
        data: params
    };
      // console.log(req);
      return $http(req).then(function(res) {
        // console.log("Got network", res);
        // return res.data;
        Auth.saveToken(res.data.token, res.data.user);
        // console.log("logged in?", Auth.isLoggedIn())
        // console.log("THIS IS IN token save", res.data.user)
        return res.data.user;
      });
    }
  };
}])

//Authenicate user via token
.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token, user) {
      $window.localStorage['mean-user-token'] = token;
      // console.log("token has been saved: ", token);
    },
    getToken: function() {
      return $window.localStorage['mean-user-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('mean-user-token');
      // console.log("User token deleted", localStorage);
    },
    isLoggedIn: function() {
      var token = this.getToken();
      if (token) {
        // console.log("logged in", token);
        return true;
      } else {
        // console.log("not logged in", token);
        return false;
      }
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          // console.log("PAYLOAD:", payload);
          return payload;
        } catch(err) {
          return false;
        }
      }
    }
  };
}])

//Token interception over AJAX. Configures the header of the request to include authorization
.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  };
}]);
