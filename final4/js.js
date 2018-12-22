function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}
function upload() {
    var file = document.getElementById("upload_file").files[0];
    var comment = $(".txt").val();
    var location = $("#location").val();
    var contact = $("#contact").val();
    var style = $("#style").val();
    var price = $("#price").val();
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();
    var size = $("#size").val();
    var email = $("#email").val();
    var username = window.location.search.slice(1);

    if (file == undefined)
        alert("please select a picture")
    else {
        var ID = '_' + Math.random().toString(36).substr(2, 9);
        let config = {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        };
        axios.put('https://bcc00j9n88.execute-api.us-east-1.amazonaws.com/p/photolx/' + ID + '.jpg',
            file,
            config
        ).then(response => {
            console.log(response);
            addimage1(ID, location, price, style)
        }).catch(error => {
            console.log(error);
        });
        axios({
            url: "https://3akucnlpnf.execute-api.us-east-1.amazonaws.com/upload/upload",
            method: 'post',
            data: {
                "message": comment,
                "photo_ID":ID,
                "location":location,
                "contact_info":contact,
                "style":style,
                "size":size,
                "email":email,
                "start_date":start_date,
                "end_date":end_date,
                "price":price,
                "user_name":username,
            },
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        });
        $(".txt").val(null);
        document.getElementById("modal02").style.display = 'none';
    }
}
    
function addimage(info) {
    var div = document.createElement("div");
    var img = new Image();
    var p = document.createElement('p');
    var photo = $(".photoBody");
    p.innerHTML =  info["location"]['S'] + "<br />" + " Price: " + info["price"]['N'] + "<br / >" + " Style: " + info["style"]['S'];
    div.setAttribute("class", "child");
    img.setAttribute("class", "img");
    p.setAttribute("class", "pr");
    img.setAttribute("src", "https://s3-us-west-2.amazonaws.com/photolx/_cah7eif7v.jpg");
    // img.setAttribute("onclick", "onClick(this)");
    div.setAttribute("onclick", "onClick(this)");
    div.append(img);
    div.append(p)
    photo.append(div);
}
function addimage1(ID, location, price, style) {
    var div = document.createElement("div");
    var img = new Image();
    var p = document.createElement('p');
    p.innerHTML = location +"<br / >" + " Price: " + price + "<br / >"+ " Style: " + style;
    div.setAttribute("class", "child");
    img.setAttribute("class", "img");
    p.setAttribute("class", "pr");
    img.setAttribute("src", "https://s3-us-west-2.amazonaws.com/photolx/"+ID+".jpg");
    // img.setAttribute("onclick", "onClick(this)");
    div.setAttribute("onclick", "onClick(this)");
    div.append(img);
    div.append(p);
    $(".photoBody").prepend(div);
}
function addimagen(info) {
    var div = document.createElement("div");
    var img = new Image();
    var p = document.createElement('p');
    var photo = $(".photoBody");
    p.innerHTML =  info["location"]['S']+"<br />" +" Price: " + info["price"]['N'] +"<br / >" +" Style: " + info["style"]['S'];
    div.setAttribute("class", "child");
    img.setAttribute("class", "img");
    p.setAttribute("class", "pr");
    img.setAttribute("src", "https://s3-us-west-2.amazonaws.com/photolx/" + info["photo_ID"]['S'] + ".jpg");
    // img.setAttribute("onclick", "onClick(this)");
    div.setAttribute("onclick", "onClick(this)");
    div.append(img);
    div.append(p)
    photo.append(div);
}

function send() {
    var msge = $(".msg").val();
    if (msge === "") {
        alert("please enter some thing!");
        return;
    }
    search(msge);
}

$(".msg").keydown(function () {
    if (event.keyCode == "13") {
        send();
        $(".msg").val(null);
    }
});


$(".input-field").keydown(function () {
    if (event.keyCode == "13") {
        sendMessage();
        $(".input-field").val(null);
    }
});

function clik() {
    document.getElementById("modal01").style.display = 'none';
}
function clik1() {
    document.getElementById("modal02").style.display = 'none';
}
function sendToLex(msg) {
    axios({
        url: 'https://mz6n1mb7ye.execute-api.us-east-1.amazonaws.com/show/chat',
        method: 'post',
        data: {
            "input": msg
        },
        headers: {
            "X-Api-Key": "ULWGhZU9di3ZNELXYJXdBwJY22E5xPS5z5ghwKCh"
        }

    }).then(response => {
        console.log(response);
        addMessage1(response.data.body['message'])
    }).catch(error => {
        console.log(error)
    })
}

function addMessage(message) {
    var d = $("<div class = 'cus'>"+ message + "</div>");
    var chatArea = $(".chatting");
    chatArea.append(d);
    var container = $(".chatting");
    container.scrollTop = container.scrollHeight;
}
function addMessage1(message) {
    var d = $("<div class = 'cus1'>" + message + "</div>");
    var chatArea = $(".chatting");
    chatArea.append(d);
    var container = $(".chatting");
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    var msg = $(".input-field").val();
    if (msg === "") {
        alert("please enter some thing!");
        return;
    }
    addMessage(msg);
    $(".input-field").val(null);
    sendToLex(msg);
}



