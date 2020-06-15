$(function () {

    "use strict";

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();

    var contactFormSubmit = function(){
        alert('here');
    }
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "https://sabeer.000webhostapp.com/email";

            // POST values in the background the the script URL
            $.ajax({
                type: "GET",
                url: url,
                data: $(this).serialize(),
                dataType: 'jsonp',
                success: function (data)
                {
                    alert('success...');
                    var messageAlert = data.status?'success':'danger';
                    var messageText = data.message;

                    var alertBox = '<div class="alert alert-' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    $('#contact-form').find('.messages').html(alertBox);
                    if (data.status) {
                        $('#contact-form')[0].reset();
                    }
                },
                error: function(e){
                    var messageAlert = 'success';
                    var messageText = "Thanks for the message";

                    var alertBox = '<div class="alert alert-' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                },
                jsonpCallback: 'contactFormSubmit'
            });
            return false;
        }
    })
});