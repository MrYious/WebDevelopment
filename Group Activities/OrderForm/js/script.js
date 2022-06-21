// ORDER LIST MODAL

var orderList = document.getElementById("Modal_OrderList");
var btn = document.getElementById("viewOrderListBtn");
var close1 = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  orderList.style.display = "flex";
}

close1.onclick = function() {
  orderList.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == orderList) {
    orderList.style.display = "none";
  }
}

// Button

var btn_addNewRow = document.getElementById("btn_addRow");

btn_addNewRow.onclick = function (){
  console.log("Hello");
  var table = document.getElementById("orders_table");
  var row = document.createElement("TR");

  var cell_unit = document.createElement('TD');
  var input_unit = document.createElement('input');
  input_unit.setAttribute('type','text');
  input_unit.setAttribute('name','p_unit[]');
  input_unit.setAttribute('class','p_unit');
  input_unit.setAttribute('readonly', 'true');
  input_unit.setAttribute('required', 'true');
  cell_unit.appendChild(input_unit);

  var cell_qty = document.createElement('TD');
  var input_qty = document.createElement('input');
  input_qty.setAttribute('type','number');
  input_qty.setAttribute('name','p_qty[]');
  input_qty.setAttribute('class','p_qty');
  input_qty.setAttribute('step', 1);
  input_qty.setAttribute('min', 1);
  cell_qty.appendChild(input_qty);

  var cell_code = document.createElement('TD');
  var input_code= document.createElement('input');
  input_code.setAttribute('type','text');
  input_code.setAttribute('name','p_code[]');
  input_code.setAttribute('class','p_code');
  input_code.setAttribute('readonly', 'true');
  input_code.setAttribute('required', 'true');
  cell_code.appendChild(input_code);

  var cell_name = document.createElement('TD');
  var select_price = document.createElement('select');
  select_price.setAttribute('class','p_name');
  select_price.setAttribute('name','p_name[]');
  var option_def = document.createElement('option');
  option_def.value = "default";
  option_def.innerHTML = "Select product";
  select_price.appendChild(option_def);
  listOfProducts.forEach(product => {
    var option = document.createElement("option");
    option.value = product[1];
    option.innerHTML = product[1];
    select_price.appendChild(option);
  });
  cell_name.appendChild(select_price);

  var cell_price = document.createElement('TD');
  var input_price= document.createElement('input');
  input_price.setAttribute('type','number');
  input_price.setAttribute('name','p_price[]');
  input_price.setAttribute('class','p_price');
  input_price.setAttribute('readonly', 'true');
  input_price.setAttribute('required', 'true');
  cell_price.appendChild(input_price);

  var cell_t_price = document.createElement('TD');
  var input_t_price= document.createElement('input');
  input_t_price.setAttribute('type','number');
  input_t_price.setAttribute('name','p_t_price[]');
  input_t_price.setAttribute('class','p_t_price');
  input_t_price.setAttribute('readonly', 'true');
  input_t_price.setAttribute('required', 'true');
  cell_t_price.appendChild(input_t_price);

  row.appendChild(cell_unit);
  row.appendChild(cell_qty);
  row.appendChild(cell_code);
  row.appendChild(cell_name);
  row.appendChild(cell_price);
  row.appendChild(cell_t_price);

  table.appendChild(row);

  var length = document.getElementsByClassName("p_name").length;

  var unit = document.getElementsByClassName("p_unit")[length-1];
  var code = document.getElementsByClassName("p_code")[length-1];
  var price = document.getElementsByClassName("p_price")[length-1];

  var name = document.getElementsByClassName("p_name")[length-1];
  var qty = document.getElementsByClassName("p_qty")[length-1];
  var totalPrice = document.getElementsByClassName("p_t_price")[length-1];

  name.onchange = function(){selectProduct(name, length-1)};
  qty.onchange = function(){onChangeQuantity(qty, length-1)};
}

// Product Select Tag

var unit = document.getElementsByClassName("p_unit");
var code = document.getElementsByClassName("p_code");
var price = document.getElementsByClassName("p_price");

var names = document.getElementsByClassName("p_name");
var qtyS = document.getElementsByClassName("p_qty");
var totalPriceS = document.getElementsByClassName("p_t_price");

var totalAmountEl = document.getElementById("c_TotalAmount");

for (let index = 0; index < names.length; index++) {
  const name = names[index];
  name.onchange = function(){selectProduct(name, index)};
}

function selectProduct(name, index){
  idx = name.selectedIndex;
  if(idx === 0){
    unit[idx].value = "";
    qtyS[idx].value = "";
    code[idx].value = "";
    price[idx].value = "";
    totalPriceS[idx].value = "";
  }else {
    unit[index].value = listOfProducts[idx-1][2];
    qtyS[index].value = "";
    code[index].value = listOfProducts[idx-1][0];
    price[index].value = listOfProducts[idx-1][3];
    totalPriceS[index].value = "";
  }
}

for (let index = 0; index < qtyS.length; index++) {
  qty = qtyS[index];
  qty.onchange = function(){onChangeQuantity(qty, index)};
}

function onChangeQuantity(qty, index){
  totalPriceS[index].value = qty.value * price[index].value;
  ComputeTotalPrice();
}

var TotalAmount = 0;

function ComputeTotalPrice(){
  for (let index = 0; index < totalPriceS.length; index++) {
    totalPrice = totalPriceS[index];
    if(totalPrice.value != ""){
      TotalAmount = parseInt(TotalAmount) + parseInt(totalPrice.value);
    }
  }
  totalAmountEl.value = TotalAmount.toLocaleString("en-US");
  TotalAmount = 0;
}
