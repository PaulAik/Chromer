jQuery(document).submit(function(e) {
    var form = jQuery(e.target);
    e.preventDefault();
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080" + form.attr("action"),
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
            $('#container').html(data);

            // Bit hacky - look for the URL field and populate if we find it
            if ($("input[name='url']").length > 0) {
                // Get the current tab URL
                chrome.tabs.query({
                    'active': true,
                    'lastFocusedWindow': true
                }, function(tabs) {
                    var url = tabs[0].url;
                    $("input[name='url']").val(url);
                });
            }
        }
    });
});

$(document).on("click", "a", function (e) {
    var anchor = e.target;
    e.preventDefault();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080" + $(anchor).attr('href'),
        success: function(data, status) {
            $('#container').html(data);
        }
    });

    return false; //for good measure
});


// On login. This should really be done before the login page is shown!
// Could move login page to server also?
$.ajax({
    type: "GET",
    url: "http://localhost:8080/profile",
    success: function(data, status) {
        $('#container').html(data);

        // Get the current tab URL
        chrome.tabs.query({
            'active': true,
            'lastFocusedWindow': true
        }, function(tabs) {
            var url = tabs[0].url;
            $("input[name='url']").val(url);
        });
    },
    error: function(data) {
        // Assuming just not authorised. Load the login screen instead.
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/login",
            success: function(data, status) {
                $('#container').html(data);
            }
        })
    }
});