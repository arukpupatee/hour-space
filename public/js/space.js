$(".space-btn").click(function(){
    $.ajax({
        method: "POST",
        url: "../save.php",
        data: { 
            action: "hit-space-book-but", 
            title: "-----", 
            need: "-----", 
            location: 0, 
            name: "-----", 
            phone: "-----", 
            email: "-----", 
            space: $("input[name=space]").val() 
        }
    })
});

$(".buy-btn").click(function(){
    $.ajax({
        method: "POST",
        url: "../save.php",
        data: { 
            action: "hit-space-buymodal-but", 
            title: "-----", 
            need: "-----", 
            location: 0, 
            name: $("input[name=name]").val(), 
            phone: $("input[name=phone]").val(),
            email: $("input[name=email]").val(),
            space: $("input[name=space]").val() 
        }
    })
});

$(".space-hour-input").on("change", function() {
    $(".space-price-amount").html($(".space-price-amount").attr("data-value")*this.value);
    if(this.value!=1)
        $(".space-price-hour").html(this.value);
    else $(".space-price-hour").html("");
})