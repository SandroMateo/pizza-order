function pizzaOrder(first, last, address, phone, size, toppings) {
  this.first = first;
  this.last = last;
  this.address = address;
  this.phone = phone
  this.sizing = size;
  this.toppings = toppings;
  this.price = 0;
}

pizzaOrder.prototype.pricing = function() {
  if(this.sizing === "Extra Large") {
    this.price = 8;
  }
  else if (this.sizing === "Large") {
    this.price = 7;
  }
  else if (this.sizing === "Medium") {
    this.price = 6;
  }
  else {
    this.price = 5;
  }
  this.price += 0.50 * this.sizing.length;
}

$(function() {
  $("#orderButton").click(function() {
    $("#welcomeScreen").slideUp();
    $("#chooseSize").show();
  });
  $("#sizeButton").click(function() {
    $("#sizeButton").slideUp();
    $("#chooseToppings").fadeIn(1500);
  });
  $("#toppingsButton").click(function() {
    $("#toppingsButton").slideUp();
    $("#userInfo").fadeIn(1500);
  });
  $("form").submit(function(event) {
    event.preventDefault();
    var inputFirst = $("#firstname-input").val();
        inputLast = $("#lastname-input").val();
        inputAddress = $("#address-input").val();
        inputPhone = $("#phone-input").val();
        inputSize = $("input:radio[name=size]:checked").val();
        inputToppings = [];
    $("input:checkbox[name=topping]:checked").each(function() {
      inputToppings.push(" " + this.value);
    })
    var order = new pizzaOrder(inputFirst, inputLast, inputAddress, inputPhone, inputSize, inputToppings);
    order.pricing();
    $("#name").text(order.first + " " + order.last);
    $("#address").text(order.address);
    $("#phone").text(order.phone);
    $("#size").text(order.sizing);
    $("#toppings").text(order.toppings);
    $("#price").text("$" + order.price.toFixed(2));
    $("form").slideUp();
    $("#finishedOrder").fadeIn(1500);
    console.log(order);
  });
});
