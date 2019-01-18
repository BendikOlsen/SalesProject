$(() => {
    //Checkbox is checked
    var isClicked = false

    $("#checkbox").on("click", function(){
        if(isClicked) {
            $("#hiddenform").css("display","none")
            isClicked = false
        } else {
            $("#hiddenform").css("display","block")
            isClicked = true
        }
    })

    // Disable submit-button after submitting form
    $(document).ready(function submitDis(){
        $("#contact-form").submit(function(){
            $("#submit").attr("disabled", true)
        })
    })


    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                cache: false,
                headers: { "cache-control": "no-cache" },
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data){
                    window.location.replace("www.goole.com")
                },
                error: function(){
                    alert("A Mistake Accured. Please refresh the page, or try again later.")
                    window.location.replace("www.google.com")
                }
            });
            return false;
        }
    })

    let bytteBil = {}

    if(isClicked){
        bytteBil.merke =        $("#form_brand").val(),
        bytteBil.kilometer =    $("#form_kilometers").val(),
        bytteBil.regNummer =    $("#form_regnumber").val() 
    }
    initMap() 
    // google map function
    function initMap(){
        var nameOfPlace = {lat: 11.274120, lng: 11.430230}
        var map = new google.maps.Map(document.getElementById("map"), {zoom: 16, center: nameOfPlace})
        var marker = new google.maps.Marker({position: nameOfPlace, map: map});
    }
    $(".navbar-nav>li>a").on("click", function(){
        $('.navbar-collapse').collapse('hide')
    })


    // slideshow 
    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    $("#minus").click(function(){
        showSlides(-1);
        console.log(slideIndex, "click left")
    })
    
   $("#pluss").click(function(){
        showSlides(+1);
        console.log(slideIndex, "click right")
   })

    // Thumbnail image controls
    $(".dot").click(function(){
        var id = $(this).attr("id")
        var n = parseInt(id[id.length-1])
        console.log(n, id)
        showSlides(slideIndex = n);
    })

    function showSlides(n) {
      
    for (var i = 1; i < 6; i++) {
        $("#img" + i).css("display","none")
        $("#dot"+ i).removeClass("active")
    }
    slideIndex += n
    if(slideIndex === 0){
        slideIndex = 5
    } else if (slideIndex === 6){
        slideIndex = 1
    }

       
    $("#img" + slideIndex).css("display","block")

    $("#dot"+ slideIndex).addClass("active")
    }
})
    



 


