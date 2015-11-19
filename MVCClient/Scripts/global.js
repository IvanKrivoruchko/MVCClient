
var data = {};
var changeData = {};
var Interval;

var WebService = {};

WebService.QGet = function (controller, action, params, complete) {
    $.ajax({
        type: 'GET',
        url: '/' + controller + '/' + action,
      //  data: params,
        success: WebService.QSuccess,
        error: WebService.QError,
        complete: complete,
        dataType: 'json'
    });
}

WebService.QPost = function (controller, action, params, complete) {
    $.ajax({
        type: 'POST',
        url: '/' + controller + '/' + action,
        data: params,
        success: WebService.QPostSuccess,
        error: WebService.QPostError,
        complete: complete,
        dataType: 'json'
    });
}

WebService.QSuccess = function (INdata) {
    var a;
}
WebService.QError = function (err,er,et) {
    var b;
}
WebService.QPostError = function (err, er, et) {
   console.log(et);

   Interval = setInterval(checkChangeData, 3000);
}
WebService.QPostSuccess = function (INdata) {
    for (var id in INdata) {
        if (INdata[id] == "success") {
            delete changeData[id];
        }
    }

   Interval = setInterval(checkChangeData, 3000);
}

Storage.prototype.setObject = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}



function GetWeekData() {
    WebService.QGet("Home", "GetWeekData", 123);
    Storage.prototype.setObject("data", data);
}


function SendWeekData() {
    clearInterval(Interval);

    var sendData = {};
    for (var id in changeData) {
        sendData[id] = data[id];
    }   
    //WebService.QPost("Home", "SendWeekData", "data=" + JSON.stringify(sendData));    
}


function readData(obj) {
    var a;
}





function CheckData() {
    if (dataIsEmpty()) {
        GetWeekData()
        ShowWeekData();
    }
    else {
        ShowWeekData();
    }
}

function dataIsEmpty() {    
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;    
}



function updateDayTime() {

    activityId = $(this.parentElement.parentElement).attr("data-id");
    day = $(this).attr("data-id");
    time = parseFloat(this.value);

    data[activityId][day] = time;
    changeData[activityId] = "await";

    Storage.prototype.setObject("data", data);
    Storage.prototype.setObject("changeData", changeData);

}

function newActivities() {

}



function checkChangeData() {
    for (var id in changeData) {
        if (changeData[id] != "success")
        {
            SendWeekData();
        }
    }
    console.log("123");
}



function ShowWeekData() {
    var tr = $(".newProjectTemplate").find("tr")[0];

    for (var i in data) {    
        var newTr = tr.cloneNode(true);

        $(newTr).attr("data-id", i);
        $(newTr).find(".newActivitiesName")[0].innerHTML =data[i].ActivitiesName;
        
        var inputArray = $(newTr).find("input");

        inputArray[0].value = data[i].Mo;
        $(inputArray[0]).attr("data-id", "Mo");
        inputArray[1].value = data[i].Tu;
        $(inputArray[1]).attr("data-id", "Tu");
        inputArray[2].value = data[i].We;
        $(inputArray[2]).attr("data-id", "We");
        inputArray[3].value = data[i].Th;
        $(inputArray[3]).attr("data-id", "Th");
        inputArray[4].value = data[i].Fr;
        $(inputArray[4]).attr("data-id", "Fr");
        inputArray[5].value = data[i].Sa;
        $(inputArray[5]).attr("data-id", "Sa");
        inputArray[6].value = data[i].Su;
        $(inputArray[6]).attr("data-id", "Su");

        $(".projectTable")[0].appendChild(newTr);
    }
}


$(document).ready(function () {

    data["12ewqe123"] = { ActivitiesName: "MyActivities", Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 7 };
    data["12ewqe124"] = { ActivitiesName: "SomeActivities", Mo: 6, Tu: 5, We: 5, Th: 1, Fr: 3, Sa: 5, Su: 4 };
    data["12ewqe125"] = { ActivitiesName: "A little bit activities", Mo: 7, Tu: 1, We: 8, Th: 6, Fr: 2, Sa: 1, Su: 3 };

    CheckData();



    $(".dayTime").change(updateDayTime);
    $(".activities").change(newActivities);

    //GetWeekData();
    //SendWeekData();

    $(".addNewActivities").click(addNewActivities)
    $(".createActivitiesBtn").click(createActivitiesBtn)


     Interval = setInterval(checkChangeData, 3000);
      
});


function addNewActivities() {
    $(".modal").modal();
}

function createActivitiesBtn() {
    var activitiesName = $(".activitiesName")[0].value    
    var tr = $(".newProjectTemplate").find("tr")[0];
    
    var newTr = tr.cloneNode(true);
    $(newTr).find(".newActivitiesName")[0].innerHTML = activitiesName;
    $(".projectTable")[0].appendChild(newTr);
}