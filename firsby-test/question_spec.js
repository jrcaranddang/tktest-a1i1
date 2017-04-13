var frisby = require('frisby');
frisby.create('testing if we can get questions with authentication')
        .post('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/SSFUsers/login', {
// MAKE SURE TO PUT YOUR ENTER YOUR USERS EMAIL AND PASSWORD
            email: 'l@l.l',
            password: 'l'    
            }, {json: true})
        .expectStatus(200)
        .expectJSONTypes({
            id: String
        })
        // 'afterJSON' automatically parses response body as JSON and passes it as an argument
        .afterJSON(function(user){
            // we have now logged into a SSFuser model you have just created.
            // now that where logged in we need to set our token to frisby's global setup
            frisby.globalSetup({
                request:{
                    headers:{ 'access_token': user.id }
                }
            });
            //This spec is where we're actually looping through the questions json response we get
            frisby.create('logged in now getting questions')
//because our models now require authentication we have to pass the access_token our get method
                //this is because the token is required in order to allow a get request to process.
                .get('https://strongloop-backend-dcarandangssf.c9users.io:8080/api/Questions?access_token=' + user.id)
                .expectStatus(200)
                .expectJSONTypes('*',{
                    Question_Number : Number,
                    Answer_ID : String,
                    Text : String,
                    Style : String,
                    id : String
                })
            .toss();
        })
.toss();