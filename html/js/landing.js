/*$(".header-search").click(function(){
    $('html,body').animate({
        scrollTop: $(".landing-space").offset().top
    });
});*/


$("#searchbtn").click(function(){
    $.ajax({
        method: "POST",
        url: "save.php",
        data: { 
            action: "hit-landing-search-but", 
            title: $("select[name=title]").val(), 
            need: $("select[name=need]").val(), 
            location: 0, 
            name: "-----", 
            phone: "-----", 
            email: "-----", 
            space: 0 
        }
    })
});

$(".modal-loc").click(function(){
    $("input[name=curloc]").val($(this).attr("data-loc"));
    $.ajax({
        method: "POST",
        url: "save.php",
        data: { 
            action: "hit-landing-modalloc", 
            title: $("select[name=title]").val(), 
            need: $("select[name=need]").val(), 
            location: $("input[name=curloc]").val(), 
            name: "-----", 
            phone: "-----", 
            email: "-----", 
            space: 0
        }
    })
});

$(".foot-loc").click(function(){
    $("input[name=curloc]").val($(this).attr("data-loc"));
    $.ajax({
        method: "POST",
        url: "save.php",
        data: { 
            action: "hit-landing-footloc", 
            title: "-----", 
            need: "-----", 
            location: $("input[name=curloc]").val(), 
            name: "-----", 
            phone: "-----", 
            email: "-----", 
            space: 0
        }
    })
});


$("#subscrbtn").click(function(){
    
    if (!$("input[name=subemail]").val()){
        alert("กรุณากรอกอีเมลของคุณ");
    } else {
        $('#namodal').modal('hide');
    }

    if ($("#locmodal").hasClass("in")){
        $.ajax({
            method: "POST",
            url: "save.php",
            data: { 
                action: "hit-landing-modalloc-subscr", 
                title: $("select[name=title]").val(), 
                need: $("select[name=need]").val(), 
                location: $("input[name=curloc]").val(), 
                name: "-----", 
                phone: "-----", 
                email: $("input[name=subemail]").val(),
                space: 0 
            }
        })
    } else {
        $.ajax({
            method: "POST",
            url: "save.php",
            data: { 
                action: "hit-landing-footloc-subscr", 
                title: "-----", 
                need: "-----", 
                location: $("input[name=curloc]").val(),
                name: "-----", 
                phone: "-----", 
                email: $("input[name=subemail]").val(),
                space: 0
            }
        })
    }
});


$(".space-anchor").click(function(){
    $.ajax({
        method: "POST",
        url: "save.php",
        data: { 
            action: "hit-space", 
            title: "-----", 
            need: "-----", 
            location: 0,  
            name: "-----", 
            phone: "-----", 
            email: "-----", 
            space: $(this).attr("data-space")
        }
    })
});