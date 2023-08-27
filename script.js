//Variables for password checking
const showPassword = document.querySelector("#show-password");
const showVerifyPassword = document.querySelector("#show-vpassword");
const passwordField = document.querySelector("#password");
const verifyPasswordField = document.querySelector("#verify-password");
const indicator = document.querySelector(".indicator");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const text = document.querySelector(".text");
const passwordError = document.querySelectorAll(".password-requirements");
const pwUpper = document.querySelectorAll(".password-uppercase");
const pwLower = document.querySelectorAll(".password-lowercase");
const pwNum = document.querySelectorAll(".password-number");
const pwChar = document.querySelectorAll(".password-char");
const pwLen = document.querySelectorAll(".password-length");
const pwData = document.querySelectorAll(".password-data");

//First Name
let firstNameInput = document.getElementById("first-name-input");
let firstNameError = document.getElementById("first-name-error");
let emptyFirstNameError = document.getElementById("empty-first-name");

//Last name
let lastNameInput = document.getElementById("last-name-input");
let lastNameError = document.getElementById("last-name-error");
let emptyLastNameError = document.getElementById("empty-last-name");

//Phone
let phoneInput = document.getElementById("phone");
let phoneError = document.getElementById("phone-error");
let emptyPhoneError = document.getElementById("empty-phone");

//Email
let emailInput = document.getElementById("email");
let emailError = document.getElementById("email-error");
let emptyEmailError = document.getElementById("empty-email");

//Password
let input = document.getElementById("password");
let passwordInput = document.getElementById("password");
let emptyPasswordError = document.getElementById("empty-password");

//Verify Password
let verifyPasswordInput = document.getElementById("verify-password");
let verifyPasswordError = document.getElementById("verify-password-error");
let emptyVerifyPasswordError = document.getElementById("empty-verify-password");
let pass=false; 

//Birthday
let birthdayInput = document.getElementById("birthday");
let birthdayError = document.getElementById("birthday-error");
let ageError = document.getElementById("age-error");
let emptyBirthdayError = document.getElementById("empty-birthday");
let age=0; 

//Submit
let submitButton = document.getElementById("submit-button");

//Valid
let validClasses = document.getElementsByClassName("valid");
let invalidClasses = document.getElementsByClassName("error");


//Text verification (if input contains only text)
const textVerify = (text) => {
  const regex = /^(?=.{2,30}$)[a-zA-Z ]+[a-zA-Z]$/; 
  return regex.test(text);
};


//Phone number verification
const phoneVerify = (number) => {
  const regex = /^(09|\+639)\d{9}$/;
  return regex.test(number);
};

//Email verification
const emailVerify = (input) => {
  const regex = /^[a-z0-9_.]+@[a-z]{3,}\.[a-z\.]{3,}$/;
  return regex.test(input);
};

//Date verification (Birthday)
const dateVerify = (text) => {
  const regex = /^(?=.{8,10}$)(?:(?:(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])\/(?:29|30)|(?:0?[13578]|1[02])\/31)\/[1-9]\d{3}|02\/29(?:\/[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00))/;
  return regex.test(birthdayInput.value);
};


function trigger(){
  //Password Verification
  //Getting every name for non-single names: e.g. Janah Patricia
  let fnameresult= firstNameInput.value.match(/\b(\w+)\b/g);
  //regex for first name: 
  let fnameRegExp= new RegExp(`${fnameresult[0]}|${fnameresult[1]}|${fnameresult[2]}`, "ig");
  let fResult= fnameRegExp.test(input.value); 
  //Input that is not a single word surname -- De Vera
  let lnameresult= lastNameInput.value.match(/\b(\w+)\b/g);
  let lnameRegExp= new RegExp(`${lnameresult[0]}|${lnameresult[1]}`, "ig"); 
  let lResult=lnameRegExp.test(input.value);

  //For birthday 
  const splitter = birthdayInput.value.replace(/[0-9]/g, '')[0];
  const parts = birthdayInput.value.split(splitter);
  const month = parts[0];
  const day = parts [1];
  const year = parts [2];
  let singleDay = day.replace(/^0+/, '');
  let singleMonth = month.replace(/^0+/, '');
  let yrEnd = year.match(/^\d{2}(\d{2})$/); 
  //let mon1= ['January','February','March','April','May','June','July','August','September','October','November','December']
  let mon2= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
  let bdayRegExp= new RegExp(`${month}|${day}|${singleDay}|${singleMonth}|${year}|${yrEnd[1]}|${mon2[month-1]}`, "ig"); 
  let bResult= bdayRegExp.test(input.value);

  let lowerCase = /[a-z]/;
  let upperCase = /[A-Z]/;
  let digits = /\d+/;
  let specialChar = /.*[!@#$%^&*()?_~-]/;
  let minLength= /\S{8,}$/;

	if(input.value != ""){
		indicator.style.display = "block";
		indicator.style.display = "flex";

    //Weak Password
	  if(lowerCase.test(input.value) || upperCase.test(input.value) || digits.test(input.value) || specialChar.test(input.value) || bResult || lResult || bResult){
      weak.classList.add("active");
      medium.classList.remove("active");
			text.style.display = "block";
			text.textContent = "Your password is too weak";
			text.classList.add("weak");
      text.classList.remove("medium");
    }
    //Medium password
    if((lowerCase.test(input.value) && upperCase.test(input.value) && digits.test(input.value)) || (lowerCase.test(input.value) && upperCase.test(input.value) && specialChar.test(input.value)) || (specialChar.test(input.value) && digits.test(input.value))){
        if(!(fResult) && !(lResult) && !(bResult)){
			    medium.classList.add("active");
			text.textContent = "Your password is medium";
			text.classList.add("medium");
	    }else{
			medium.classList.remove("active");
			text.classList.remove("medium");
	    }
    }
    //Strong password
	  if(lowerCase.test(input.value) && upperCase.test(input.value) && digits.test(input.value) && specialChar.test(input.value) && minLength.test(input.value) && !(fResult) && !(lResult) && !(bResult)){
      pass=true; 
      medium.classList.add("active");
			strong.classList.add("active");
			text.textContent = "Your password is strong";
			text.classList.add("strong");
	    }else{
			strong.classList.remove("active");
			text.classList.remove("strong");
	  } 
  } else {
  indicator.style.display = "none";
  text.style.display = "none";
  } 
  //For checking password requirements
  if(input.value!=""){
    passwordError[0].classList.remove("hide"); 
     
    if(lowerCase.test(input.value)){
      pwLower[0].classList.add("active");
    }else{
      pwLower[0].classList.remove("active");
      passwordError[0].classList.add("active");
    }
  
    if(upperCase.test(input.value)){
      pwUpper[0].classList.add("active");
    }else{
      pwUpper[0].classList.remove("active");
      passwordError[0].classList.add("active");
    }
  
    if(digits.test(input.value)){
      pwNum[0].classList.add("active");
    }else{
      pwNum[0].classList.remove("active");
      passwordError[0].classList.add("active");
    }
  
    if(specialChar.test(input.value)){
      pwChar[0].classList.add("active");
    }else{
      pwChar[0].classList.remove("active");
      passwordError[0].classList.add("active");
    }
    
    if(minLength.test(input.value)){
      pwLen[0].classList.add("active");
    }else{
      pwLen[0].classList.remove("active");
      passwordError[0].classList.add("active");
    }

    if(!(fResult) && !(lResult) && !(bResult)){
      pwData[0].classList.add("active");
    }else{
      pwData[0].classList.remove("active");
      passwordError[0].classList.add("active");
    }
  }
  
//To validate password
 if (pass) {
    pass=false; 
    validInput(passwordInput);
  } else {
    passwordInput.classList.remove("valid");
    passwordInput.classList.add("error");
    emptyUpdate(passwordInput, emptyPasswordError, passwordError[0]);
  }
};


//For empty input - accepts(input,empty error for that input and other errors)
const emptyUpdate = (inputReference, emptyErrorReference, otherErrorReference) => {
  if (!inputReference.value) {
    //input is null/empty
    emptyErrorReference.classList.remove("hide");
    otherErrorReference.classList.add("hide");
    inputReference.classList.add("error");
  } else {
    //input has some content
    emptyErrorReference.classList.add("hide");
  }
};

//For error styling and displaying error message
const errorUpdate = (inputReference, errorReference) => {
  errorReference.classList.remove("hide");
  inputReference.classList.remove("valid");
  inputReference.classList.add("error");
};

//For no errors
const validInput = (inputReference) => {
  inputReference.classList.remove("error");
  inputReference.classList.add("valid");
};

//First name
firstNameInput.addEventListener("input", () => {
  if (textVerify(firstNameInput.value)) {
    //If verification returns true
    firstNameError.classList.add("hide");
    validInput(firstNameInput);
  } else {
    //for false
    errorUpdate(firstNameInput, firstNameError);
    //empty checker
    emptyUpdate(firstNameInput, emptyFirstNameError, firstNameError);
  }
});

//Last name
lastNameInput.addEventListener("input", () => {
  if (textVerify(lastNameInput.value)) {
    lastNameError.classList.add("hide");
    validInput(lastNameInput);
  } else {
    errorUpdate(lastNameInput, lastNameError);
    emptyUpdate(lastNameInput, emptyLastNameError, lastNameError);
  }
});

//Phone
phoneInput.addEventListener("input", () => {
  if (phoneVerify(phoneInput.value)) {
    phoneError.classList.add("hide");
    validInput(phoneInput);
  } else {
    errorUpdate(phoneInput, phoneError);
    emptyUpdate(phoneInput, emptyPhoneError, phoneError);
  }
});

//Email
emailInput.addEventListener("input", () => {
  if (emailVerify(emailInput.value)) {
    emailError.classList.add("hide");
    validInput(emailInput);
  } else {
    errorUpdate(emailInput, emailError);
    emptyUpdate(emailInput, emptyEmailError, emailError);
  }
});

//Password
passwordInput.addEventListener("focus", () => {
  passwordError[0].classList.add("active");
}); 
passwordInput.addEventListener("blur", () => {
  passwordError[0].classList.remove("active");
}); 
showPassword.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type= passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
})

//Verify password
verifyPasswordInput.addEventListener("input", () => {
  if (verifyPasswordInput.value === passwordInput.value) {
    verifyPasswordError.classList.add("hide");
    validInput(verifyPasswordInput);
  } else {
    errorUpdate(verifyPasswordInput, verifyPasswordError);
    emptyUpdate(passwordInput, emptyVerifyPasswordError, verifyPasswordError);
  }
});
showVerifyPassword.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type= verifyPasswordField.getAttribute("type") === "password" ? "text" : "password";
  verifyPasswordField.setAttribute("type", type);
})

//Birthday
birthdayInput.addEventListener("input", () => {
  //validate age (18+)
  const date = new Date();
  let day = date.getDate();
  let month= date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = month + "/"+ day + "/" + year;
  let d1= new Date(currentDate);
  let d2= new Date(birthdayInput.value);
  let difference= d1.getTime()-d2.getTime(); 
  let age= difference/(1000*3600*24);

  if (dateVerify(birthdayInput.value)) {
    birthdayError.classList.add("hide");
    validInput(birthdayInput);
    if (age<6569){
      errorUpdate(birthdayInput, ageError);
    }
  } else {
    if (age>6569){
      ageError.classList.add("hide");
      validInput(birthdayInput);
    }
    errorUpdate(birthdayInput, birthdayError, ageError);
    emptyUpdate(birthdayInput, emptyBirthdayError, birthdayError, ageError);
  }
  
});

//Submit button
submitButton.addEventListener("click", () => {
  if (validClasses.length == 7 && invalidClasses.length == 0) {
    alert("Registation Successful");
  } else {
    alert("Registration Failed");
  }
});
