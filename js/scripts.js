function pizzaOrder(name, size, toppings) {
  this.name = name;
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
    this.price = 7;
  }
  else {
    this.price = 7;
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
  $("form").submit(function(event) {
    event.preventDefault();
    var inputName = $("#name-input").val();
    var inputSize = $("input:radio[name=size]:checked").val();
    var inputToppings = [];
    $("input:checkbox[name=topping]:checked").each(function() {
      inputToppings.push(this.value);
    })
    console.log(inputToppings);
    var order = new pizzaOrder(inputname, inputSize, inputToppings);

  });
});
