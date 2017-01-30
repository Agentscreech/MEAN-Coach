angular.module('App')
.component('userSettingsComp', {
  templateUrl: 'app/containers/userSettings/userSettings.html',
  controller: UserSettingsCompCtrl,
  controllerAs: 'userSettingsComp'
});

function UserSettingsCompCtrl($state) {
      var userSettingsComp = this;
      userSettingsComp.isMetric = false;
      userSettingsComp.weight = null;
      userSettingsComp.height = null;
      userSettingsComp.age = null;
      userSettingsComp.gender = 'male';
      userSettingsComp.goal = null;
      userSettingsComp.bmr = false;

   userSettingsComp.calcBMR = function (weight, height, age, gender) {
        console.log('trying to calculate');
        if(!userSettingsComp.isMetric){
          weight = weight * 0.4536;
          height = height * 2.54;
        }
        if (gender == 'Male'){
          bmr = (10 * weight) + (6.25 * height) - (5* age) + 5;
        } else if (gender == 'Female'){
          bmr = (10 * weight) + (6.25 * height) - (5* age) - 161;
        } else {
          error = "gender not defined";
          return error;
        }
        // console.log(bmr);
        userSettingsComp.bmr = bmr;
        // return bmr;
      };
      //need to right a service to update user

}

UserSettingsCompCtrl.$inject = ['$state'];
