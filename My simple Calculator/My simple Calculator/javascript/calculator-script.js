function addNumbers() {
  var num1 = parseFloat(document.getElementById("txtNum1").value);
  var num2 = parseFloat(document.getElementById("txtNum2").value);
  var sum = num1 + num2;
  alert("The sum is: " + sum);
}

function subtractNumbers() {
  var num1 = parseFloat(document.getElementById("txtNum1").value);
  var num2 = parseFloat(document.getElementById("txtNum2").value);
  var difference = num1 - num2;
  alert("The difference is: " + difference);
}

function multiplyNumbers() {
  var num1 = parseFloat(document.getElementById("txtNum1").value);
  var num2 = parseFloat(document.getElementById("txtNum2").value);
  var product = num1 * num2;
  alert("The product is: " + product);
}

function divideNumbers() {
  var num1 = parseFloat(document.getElementById("txtNum1").value);
  var num2 = parseFloat(document.getElementById("txtNum2").value);
  var quotient = num1 / num2;
  alert("The quotient is: " + quotient);
}

function clearTextboxes() {
  document.getElementById("txtNum1").value = "";
  document.getElementById("txtNum2").value = "";
}