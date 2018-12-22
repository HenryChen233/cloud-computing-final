// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-west-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-west-2:b6ed611a-b6c9-4ad8-85f0-302a37830f2e',
// });

// AWS.config.credentials.get(function () {

//     // Credentials will be available when this function is called.
//     var accessKeyId = AWS.config.credentials.accessKeyId;
//     var secretAccessKey = AWS.config.credentials.secretAccessKey;
//     var sessionToken = AWS.config.credentials.sessionToken;

// });
// console.log(AWS.config.credentials)



$(".msg").keydown(function () {
    if (event.keyCode == "13") {
        send();
        $(".msg").val(null);
    }
});

function send() {
    var msge = $(".msg").val();
    if (msge === "") {
        alert("please enter some thing!");
        return;
    }
    post(msge);
}
