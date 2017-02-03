MEAN-Coach
==================
A ![mean](mean-logo.jpg) app that tracks your food and activities.

This application allows users to signup, enter personal stats and foods/activities each day, and track progress as a user based on target daily calories.

If you are cloning this to work on a local server, just clone and then run `npm install` to get all the dependencies up and running.

Live version available at:

http://mean-coach.herokuapp.com

This is hosted by Heroku in a developer tier so it might take a few seconds for it to spin up and serve the site.

### Usage

You can either Sign Up or Log In in the top right corner of the page.


If you would like to see a user profile without going through the sign up process, you can use a test account that I have set up.

Email: testing@app.com
Password: testingapp

If you create an account, you will be brought to the settings page for your profile. Here you will enter your weight, height, age, and gender to calculate your Basal Metabolic Rate.

It will give you a few suggestions on what your daily calorie goal should be.

Once you input your daily goal, you will return to your profile page.

Now you can add foods that you eat throughout your day to track your caloric intake.  You can search by name, or by UPC.

You can also add activities that you do.  We have a sample of around 40 of the most common activities.

This will subtract from the net total calories for the day.

If you exceed your goal, we will suggest a random activity for the exact duration needed to get you to your goal.

You may add and delete food items and activities at will.



### Technologies

This application is built on the [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle) stack and utilizes [Materialize](http://materializecss.com/) styling framework.

We are using the [USDA's API](https://ndb.nal.usda.gov/ndb/api/doc) for the list of food items.
