
var sum_factor = 1;
var base_price = $(".space-price-amount").attr("data-value");
var total_price = base_price;
var hour = 1;

var addon_price = 0;

$(".space-book-input").on("change", function() {
    sum_factor = parseInt($(".space-book-input").eq(0).val())*parseFloat($(".space-book-input").eq(1).val(),10);  // Or this.innerHTML, this.innerText
    hour = $(".space-book-input").eq(0).val();
    if(hour!=1)
        $(".space-price-hour").html(hour);
    else $(".space-price-hour").html("");
    update_price();
})


$("input[name='addon-checkbox']").on("change", function() {
    addon_price = 0;
    $("input[name='addon-checkbox']:checked").each(function(){
        addon_price += parseInt($(this).val(),10);  // Or this.innerHTML, this.innerText
    });
    update_price();
})

function update_price(){
    total_price = (base_price*sum_factor) + addon_price;
    $(".space-price-amount").html(total_price);
}