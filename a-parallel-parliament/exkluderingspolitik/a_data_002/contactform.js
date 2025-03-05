$(function () {
    "use strict";
    
    /*  
        Template name    : Multipurpose Responsive Website Template
        Author           : FDU
        Version          : 1.0
        File Description : contact js file of the template
    */
    $('#ajax-contact').validator();
    $('#ajax-contact').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "https://multireligionvalsystem.eu.org/a-parallel-parliament/exkluderingspolitik/assets/phpscripts/contact.php";
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    $( "#msgSubmit" ).removeClass( "hidden" );
                    $('#ajax-contact')[0].reset();
                    
                }
            });
            return false;
        }
    })
});
