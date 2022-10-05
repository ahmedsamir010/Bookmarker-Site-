var inputName = document.querySelector("#inputName");
var inputUrl = document.querySelector("#inputUrl");
var inputs = document.querySelectorAll("input");
var subBtn = document.querySelector("#sub-btn");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var displaySite = document.getElementById("displaySite");
var dataContainer = [];

inputName.addEventListener("blur",validName)
inputUrl.addEventListener("blur",validUrl)
function validName(){
  let regexName=/^[A-Z][a-z]{3,10}[0-9]?/
  if(regexName.test(inputName.value) == true)
  {
    inputName.classList.add("is-valid")
    inputName.classList.remove("is-invalid")
    alertName.style.display="none"
    return true;
  }
  else{
    inputName.classList.add("is-invalid")
    inputName.classList.remove("is-valid")
    alertName.style.display="block"
    return false;
  }
}
function validUrl(){
  if(inputUrl.value ==""){
    inputUrl.classList.add("is-invalid")
    inputUrl.classList.remove("is-valid")
    alertUrl.style.display="block"
    return false
  }else{
    inputUrl.classList.add("is-valid")
    inputUrl.classList.remove("is-invalid")
    alertUrl.style.display="none"
    return true
  }
}

 
if (localStorage.getItem("data") != null) {
  dataContainer = JSON.parse(localStorage.getItem("data"));
  displayData();
}
subBtn.addEventListener("click", addData);
function addData() {
  if(validName() == true && validUrl()==true){  
  var data = {
      name: inputName.value,
      url: inputUrl.value,
    };
    dataContainer.push(data);
    localStorage.setItem("data", JSON.stringify(dataContainer));
    displayData();
    displaySite.style.display="block"
    clearForm();
}
}
function displayData() {
  var temp = ``;
  for (var i = 0; i < dataContainer.length; ++i) {
    temp += `
    <div class="row">
        <div class="col-md-4">
          <h2  style="color: 0729d2;">${dataContainer[i].name}</h2>
        </div>
        <div class="col-md-8 ">
          <a class="btn btn-primary" href="${visitUrl(
            i
          )}" target="_blank" onclick="visitUrl();" >visit</a>
          <button class="btn btn-danger" onclick="deletData(${i});">Delete</button></td> 
        </div>
      </div>

    `;
  }
  document.querySelector(".content2").innerHTML = temp;
}

//      *** visit Url ***
function visitUrl(i) {
  if (
    dataContainer[i].url.includes("https://") != true &&
    dataContainer[i].url.includes("http://") != true
  ) {
    return "https://" + dataContainer[i].url;
  } else {
    return dataContainer[i].url;
  }
}

//    *** delete Data ***
function deletData(deleteindex) {
  alert("Are You Want To Delet This Item")
  dataContainer.splice(deleteindex, 1);
  displayData();
  localStorage.setItem("data", JSON.stringify(dataContainer));
  if(dataContainer.length==0){
    displaySite.style.display="none"

  }


}

//  *************************************************

function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
