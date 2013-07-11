$(document).ready(function () {
    //variables to construct from
    var salutation = 'Hi Mum, could you please book an appointment for ';
    var who = 'who';
    var where = 'where';
    var date = 'date';
    var time = 'time';
    var timeTolSet = false;
    var timeTolPve = '';
    var timeTolNve = '';
    var why = 'why';
    var special = '';
    var closing = 'Thanks!!';

    var dslContent = function () {
        $('#dsl').html('#' + who + ' ' +
            '@' + where + ' ' +
            ':' + date + ' ' + time + ' ' + structureTimeTol() +
            '?' + why + ' ' +
            '*' + special);
    };

    var naturalContent = function () {
        var naturalText = salutation + ' ' + 
            who + ' ' +
            'at ' + where + ' ' +
            'on ' + date + ' at ' + 
            time + ' ' +
            'for ' + why + '.<br>' + 
            structureTimeTol('natural') + 
            special + 
            closing;
            
        $('#natural').html(naturalText);
        $('#modalCheckBody').html(naturalText);
    };

    var updateTxt = function () {
        dslContent();
        naturalContent();
    };

    var structureTimeTol = function (context) {
        if (timeTolSet) {
            if (context === 'natural') {
                if (timeTolPve === timeTolNve) {
                    return "I'm flexible, the appointment can be " + timeTolPve + '&thinsp;minutes either way.<br>';
                } else {
                    return "I'm flexible, the appointment can be " + timeTolPve + '&thinsp;minutes after then or ' + timeTolNve + '&thinsp;minutes before.<br>';
                }
            } else {
                return '~(+' + timeTolPve + 'm, -' + timeTolNve + 'm) ';
            }
        } else {
            return '';
        }
    };
    
var submitForm = function (emailString) {
    var param = { "requestBody": emailString };
	console.log('in the email function', emailString);
    $.post("/mum/email.php", 
			param,
			function(data){
				console.log('in the response');
				console.log(data.body);
			},
			"json");
};

    //--------------------here we go--------------------
    $('#sendToMum').click(function(){
		console.log('submit button pressed');
		submitForm($('#modalCheckBody').html());
		//should have some kind of async confirmation thing here really
		$('#modalCheckBody').html("<p>Thanks for making a request!<br>"+
									"Once Irina has done some design work on this site it'll be really cool.</p>");
		});

    $('#whoInput').keyup(function () {
        who = $(this).val();
    });
    $('#whereInput').keyup(function () {
        where = $(this).val();
    });
    $('#whyInput').keyup(function () {
        why = $(this).val();
    });
    $('input').keyup(updateTxt);
    $('#special').keyup(function () {
        var s = $(this).val();
        if (s.length > 0) {
            special = 'Oh, and by the way ' + s + '<br>';
        } else {
            special = '';
        }
        updateTxt();
    });

    $.widget("ui.timespinner", $.ui.spinner, {
        options: {
            // seconds
            step: 60 * 1000 * 5, //5 minute increments
            // hours
            page: 60,
            spin: function () { 
                  time = $(this).val();                  
                  updateTxt();
               },
               change: function () { //change, in case someone changes it using their keyboard
                  time = $(this).val();                  
                  updateTxt();
               }
        },
        _parse: function (value) {
            if (typeof value === "string") {
                // already a timestamp
                if (Number(value) === value) {
                    return Number(value);
                }
                return +Globalize.parseDate(value);
            }
            return value;
        },
        _format: function (value) {
            return Globalize.format(new Date(value), "t");
        }
    });
    $("#timespinner").timespinner();    

    $(function () {
        $("#datepicker").datepicker({
            dateFormat: "DD, d MM, yy",
            onClose: function (selectedDate) {
                date = selectedDate;
                updateTxt();
            }
        });
    });

    //for some other time pickers look here: 
    //http://www.jquery4u.com/plugins/10-jquery-time-picker-plugins/
    //http://fgelinas.com/code/timepicker/

    //control the tollerance spinners
    //spins
    $(function () {
        $("#pveSpinner, #nveSpinner").spinner({
            spin: function (event, ui) {
                if (ui.value < 0) {
                    $(this).spinner("value", 0);
                }
                timeTolPve = $("#pveSpinner").val();
                timeTolNve = $("#nveSpinner").val();
                timeTolSet = true;
                updateTxt();
            }
        });
    });
    //type ins
    $('#pveSpinner').keyup(function () {
        timeTolPve = $(this).val();
        timeTolSet = true;
        updateTxt(); //this is calling update twice, but it works
    });
    $('#nveSpinner').keyup(function () {
        timeTolNve = $(this).val();
        timeTolSet = true;
        updateTxt();
    });

});