function pizzaOrder(name) = {
  this.name = name;
  this.toppings = [];
  this.sizing = "";
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
    $("#chooseSize").show();
  });
  $("#sizeButton").click(function() {
    $("#chooseToppings").show();
  });
  $("form").submit(function(event) {
    event.preventDefault();
    var inputName = $("#name-input").val();
  });
});
