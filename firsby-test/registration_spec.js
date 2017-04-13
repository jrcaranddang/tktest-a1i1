var frisby = require('frisby');
//this variable is what will use to create unique names, emails, and passwords
var userModel = new Date().getTime() + "";
var userModel2 = userModel + "2";
// testing resgistration of a ssfuser model without an organziation
frisby.create('Testing User Registration')
        .post('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers', {
            firstName: userModel,
            lastName: userModel ,
            email: userModel + "@" + userModel + ".com" ,
            password: userModel
        })
        .expectStatus(200)
        // what the after funciton allows us to do is after
        // we run this test we run this next set of tests
        .after(function(err, res, body){
            //In order to delete a user we need to login.
            //This is because we need an authentication token to delete a user
            frisby.create('Delete created test user')
                .post('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers/login', {
                email: userModel + "@" + userModel + ".com" ,
                password: userModel
                })
                .expectStatus(200)
                .afterJSON(function(user){
                   
                    frisby.globalSetup({
                        request:{
                            headers:{ 'access_token': user.id }
                        }
                    });
                   
                    frisby.create('deleting registered model now')
                        .delete('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers/' + user.userId + '?access_token=' + user.id)
                        .expectStatus(200)
                    .toss();
                   
                })
            .toss();
        })
.toss();
// testing resgistration of a ssfuser model with an organizaiton
frisby.create('Testing User Registration')
        .post('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers', {
            firstName: userModel2,
            lastName: userModel2,
            organization: userModel2,
            email: userModel2 + "@" + userModel2 + ".com" ,
            password: userModel2
        })
        .expectStatus(200)
        // what the after funciton allows us to do is after
        // we run this test we run this next set of tests
        .after(function(err, res, body){
            //In order to delete a user we need to login.
            //This is because we need an authentication token to delete a user
            frisby.create('Delete created test user')
                .post('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers/login', {
                email: userModel2 + "@" + userModel2 + ".com" ,
                password: userModel2
                })
                .expectStatus(200)
                .afterJSON(function(user){
                   
                    frisby.globalSetup({
                        request:{
                            headers:{ 'access_token': user.id }
                        }
                    });
                    // this test is the thing actually deleting the user model registered above.
                    frisby.create('deleting registered model now')
                        .delete('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers/' + user.userId + '?access_token=' + user.id)
                        .expectStatus(200)
                    .toss();
                })
            .toss();
        })
.toss();