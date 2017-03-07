angular
		.module("App")
		.component('foods', {
				bindings: {
						foodList: '<',
						currentCals: '='
				},
				templateUrl: 'app/components/foods/foods.html',
				controller: FoodsCtrl,
				controllerAs: "foodComp",
		});


function FoodsCtrl($window, $http, $interval, Auth, Log, DeleteFood) {

		var foodComp = this;

		var today = moment().format('MMMM Do YYYY');
		foodComp.hideSaveMeal = false;
		foodComp.currentCals = 0;
		foodComp.searchTerm = undefined;
		foodComp.chosenFoods = [];
		foodComp.chosenFoodMeasures = [];
		foodComp.soloFoodSearch = true;
		var deleteId = {
				user_id: Auth.currentUser().id,
				_id: null
				}

		var log = {
				user_id: Auth.currentUser().id,
				logs: {
						date: today,
						foods: []
				}
		};
		foodComp.mealList = log.logs;
		foodComp.measureQtys = [];
		foodComp.savedMeals = [];
		foodComp.savedMealDate = "";


		//Delay search for 1 second after done typing
		var interval = 1000;
		foodComp.delayBeforeSearch = function() {
				$interval.cancel(interval);
				interval = $interval(function() {
						foodComp.findFoods();
						$interval.cancel(interval);
				}, 1000);
		};


		// Return list of available foods based on search term
		foodComp.findFoods = function() {
				if (foodComp.searchTerm !== undefined && foodComp.searchTerm !== "") {
						var req = {
								url: 'api/foods/foodresults?searchTerm=' + foodComp.searchTerm,
								method: 'GET'
						};

						$http(req).then(function success(res) {
								if (res.data.list === undefined) {
										foodComp.searchResults = null;
								} else {
										foodComp.searchResults = res.data.list.item;
								}
						}, function failure(res) {
								console.log('failed');
						});
				} else {
						foodComp.searchResults = undefined;
				}
				return foodComp.searchResults;
		};


		// Select one of the foods from the search results to retrieve calorie info
		foodComp.chooseFood = function($event) {

				foodComp.measureQtys = [];
				foodComp.searchResults = [];
				foodComp.searchTerm = "";

				var foodID = event.target.id;
				var req = {
						url: 'api/foods/addfood?foodId=' + foodID,
						method: 'GET'
				};

				$http(req).then(function success(res) {
						foodComp.chosen = res.data.report;
						console.log(foodComp.chosen);
						foodComp.chosenFoods.push({
								name: foodComp.chosen.food.name,
								kCals: foodComp.chosen.food.nutrients[1].value
						});

						var nutrients = foodComp.chosen.food.nutrients;
						for (var i = 0; i < nutrients.length; i++) {
								if (nutrients[i].name == "Energy") {
										foodComp.chosenFoodMeasures = nutrients[i].measures;
								}
						}
						for (var i = 0; i < foodComp.chosenFoodMeasures.length; i++) {
							foodComp.measureQtys.push(1);
						}

						foodComp.chosenFoodName = foodComp.chosen.food.name;

				}, function failure(res) {
						console.log('failed');
				});
		};


		// Add food to meal and reset search
		foodComp.addFood = function($event) {
				var qtyCals = parseInt(event.target.id);
				foodComp.mealList.foods.push({
						name: foodComp.chosenFoodName,
						kcals: qtyCals
				});
				foodComp.chosenFoodName = "";
				foodComp.chosenFoods = [];
				document.querySelector('#currentChosenFood').remove();
				foodComp.searchTerm = undefined;
		};


		// Save food to your daily log
		foodComp.saveFood = function() {
				console.log("hit")

				foodComp.mealList.foods.forEach(function(food){
						foodComp.foodList.push(food);
						foodComp.currentCals += food.kcals;
				});
				// console.log('trying to append ', foodComp.mealList.foods[0]);
				console.log('trying to send ', log);
				Log.update(log, function success(data){
						foodComp.mealList.foods = [];
						foodComp.chosenFoods = [];
						// console.log('success res', data);
						// Profile.getLogs(user_id).then(function(res) {
						//     var logs = res.data;
						//     logs.forEach(function(log) {
						//         if (log.date == today) {
						//             log.foods.forEach(function(food) {
						//                 profileComp.foods.push(food);
						//                 profileComp.currentCals += food.kcals;
						//             });
						//             log.activities.forEach(function(activity) {
						//                 profileComp.activities.push(activity);
						//                 profileComp.currentCals -= activity.caloriesBurned;
						//             });
						//         }
						//     });
						// });
				}, function error(data){
						console.log('error', data);
				});


		};


		// Exit food quantity options
		foodComp.remove = function() {
				document.querySelector('#currentChosenFood').remove();
				foodComp.chosenFoods.pop();
		};


		// Remove food from meal
		foodComp.removeChosenFood = function($index) {
				console.log(foodComp.mealList.foods);
				document.getElementById('saved-food-'+$index).remove();
				foodComp.mealList.foods.splice($index,1);
		};

		//Delete activity from current user log
		foodComp.deleteFood = function($index) {
			deleteId._id = foodComp.foodList[$index]._id;
			deleteId.user_id = Auth.currentUser().id;
			console.log("Delete id: ", deleteId);
			DeleteFood.delete(deleteId).then(function(res) {
					foodComp.currentCals -= foodComp.foodList[$index].kcals;
					foodComp.foodList.splice($index, 1);
			}, function error(data) {
				console.log(data);
			});
		};

}

FoodsCtrl.$inject = ['$window','$http', '$interval', 'Auth', 'Log', 'DeleteFood'];
