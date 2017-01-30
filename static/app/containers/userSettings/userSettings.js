angular.module('App')
.component('userSettingsComp', {
  templateUrl: 'app/containers/userSettings/userSettings.html',
  controller: UserSettingsCompCtrl,
  controllerAs: 'userSettingsComp'
});

function UserSettingsCompCtrl($state) {
      var userSettingsComp = this;

      userSettingsComp.weight = 70;
      userSettingsComp.height = 180;
      userSettingsComp.age = 21;
      userSettingsComp.gender = 'male';
      userSettingsComp.goal = 0;
      userSettingsComp.bmr = false;

   userSettingsComp.calcBMR = function (weight, height, age, gender) {
        console.log('trying to calculate');
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
}

UserSettingsCompCtrl.$inject = ['$state'];
