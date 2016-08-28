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
  this.price += 0.50 * this.sizing.length;
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
  $("#orderButton").click(function() {
    $("#welcomeScreen").slideUp();
    $("#chooseSize").show();
  });
  $("#sizeButton").click(function() {
    $("#sizeButton").slideUp();
    $("#chooseToppings").fadeIn(1500);
    inputSize = $("input:radio[name=size]:checked").val();
  });
  $("#toppingsButton").click(function() {
    $("#toppingsButton").slideUp();
    $("#userInfo").fadeIn(1500);
    $("input:checkbox[name=topping]:checked").each(function() {
      inputToppings.push(" " + this.value);
    })
    var order = new pizzaOrder(inputSize, inputToppings);
    ordArray.push(order);
    console.log(order);
  });
  $("form").submit(function(event) {
    event.preventDefault();
    var inputFirst = $("#firstname-input").val();
        inputLast = $("#lastname-input").val();
        inputAddress = $("#address-input").val();
        inputPhone = $("#phone-input").val();
    var customer = new pizzaCustomer(inputFirst, inputLast, inputAddress, inputPhone, ordArray);
    customer.totalPricing();
    $("#name").text(customer.first + " " + customer.last);
    $("#address").text(customer.address);
    $("#phone").text(customer.phone);
    $("#size").text(customer.orders[0].sizing);
    $("#toppings").text(customer.orders[0].toppings);
    $("#price").text("$" + customer.totalPrice.toFixed(2));
    $("form").slideUp();
    $("#finishedOrder").fadeIn(1500);
    console.log(order);
  });
});
