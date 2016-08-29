function pizzaCustomer(first, last, address, phone, orders) {
  this.first = first;
  this.last = last;
  this.address = address;
  this.phone = phone;
  this.orders = orders;
  this.totalPrice = 0;
}

function pizzaOrder(size, toppings) {
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
  this.price += 0.50 * this.toppings.length;
}

pizzaCustomer.prototype.totalPricing = function() {
  for (var i = 0; i < this.orders.length; i++) {
    this.orders[i].pricing();
    this.totalPrice += this.orders[i].price;
  }
}

$(function() {
  var ordArray = [];
  var inputSize = "";
  var inputToppings = [];
  $("#takeOutButton").click(function() {
    $("#welcomeScreen").slideUp();
    $("#takeOutInfo").show();
    $("#infoButton").show();
  });
  $("#deliverButton").click(function() {
    $("#welcomeScreen").slideUp();
    $("#takeOutInfo").show();
    $("#deliveryInfo").show();
    $("#infoButton").show();
  });
  $("#infoButton").click(function() {
    $("#infoButton").slideUp();
    $("#chooseSize").show();
  });
  $("#sizeButton").click(function() {
    $("#sizeButton").slideUp();
    $("#chooseToppings").fadeIn(1500);
    $("#addButton").show();
    $("#submitButton").show();
    inputSize = $("input:radio[name=size]:checked").val();
  });
  $("#addButton").click(function() {
    $("#addButton").hide();
    $("#submitButton").hide();
    $("#chooseToppings").slideUp();
    $("#sizeButton").slideDown();
    $("input:checkbox[name=topping]:checked").each(function() {
      inputToppings.push(" " + this.value);
    });
    var order = new pizzaOrder(inputSize, inputToppings);
    ordArray.push(order);
    $("#list").text("");
    for (var i = 0; i < ordArray.length; i++) {
      $("#list").append("<li> Pizza " + (i+1) + ":" +
                            "<ul><p>Size: " + ordArray[i].sizing + "</p>" +
                                "<p>Toppings: " + ordArray[i].toppings + "</p></ul></li>");
    }
    $("input:checkbox[name=topping]:checked").prop("checked", false); 
    $("#orderList").slideDown();
    inputSize = "";
    inputToppings = [];
  });
  $("form").submit(function(event) {
    event.preventDefault();
    $("#addButton").hide();
    $("#submitButton").hide();
    var inputFirst = $("#firstname-input").val();
        inputLast = $("#lastname-input").val();
        inputAddress = $("#address-input").val();
        inputPhone = $("#phone-input").val();
    var customer = new pizzaCustomer(inputFirst, inputLast, inputAddress, inputPhone, ordArray);
    $("input:checkbox[name=topping]:checked").each(function() {
      inputToppings.push(" " + this.value);
    });
    var order = new pizzaOrder(inputSize, inputToppings);
    ordArray.push(order);
    $("#list").text("");
    for (var i = 0; i < ordArray.length; i++) {
      $("#list").append("<li> Pizza " + (i+1) + ":" +
                            "<ul><p>Size: " + ordArray[i].sizing + "</p>" +
                                "<p>Toppings: " + ordArray[i].toppings + "</p></ul></li>");
    }
    customer.totalPricing();
    $("#name").text(customer.first + " " + customer.last);
    if(customer.address !== "") {
      $("#address").text(customer.address);
      $("#phone").text(customer.phone);
      $(".delivery").show();
    }
    $("#price").text("$" + customer.totalPrice.toFixed(2));
    $("form").slideUp();
    $("#finishedOrder").fadeIn(1500);
    $("#pricing").show();
  });
});
