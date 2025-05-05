const form = document.getElementById("form")
const nameIn = document.getElementById("name")
const password = document.getElementById("password")

const namesign = document.getElementById("namesign")
const passwordsign = document.getElementById("passwordsign")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const nameInput = nameIn.value
    const passwordInput = password.value
    console.log(nameInput,passwordInput)
    const jsonData = {username:nameInput,password:passwordInput}

    fetch("/",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(jsonData)
    })

    fetch("/index.html", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data=>{
        if (data.token) {
            const token = localStorage.setItem("token",data.token)
            console.log(token)
             protectedRoute()
        } else {
            return response.json().then(data => {
                console.error("Login failed:", data.error);
            });
        }})

})
function protectedRoute(){
    const token = localStorage.getItem("token")
fetch("/home.html",{
    method:"GET",
    headers:{
     "Authorization":`Bearer ${token}`
    }
 })
 .then(res=>{
   if(res.ok){
    window.location.herf = "home.html"
   }
 })
}



form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const nameInput = namesign.value
    const passwordInput = passwordsign.value
    console.log(nameInput,passwordInput)
    const jsonData = {username:nameInput,password:passwordInput}
     
    fetch("/signup.html",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(jsonData)
    })

})

document.addEventListener("DOMContentLoaded", (event) => {
    const signupBtn = document.getElementById("SignAho"); // Replace "SignAho" with the correct ID
    if (signupBtn) { // Add a check to make sure the element exists
        signupBtn.addEventListener("click", () => {
            event.preventDefault();
            window.location.href = "index.html"; // Corrected property name
            console.log("click ho gya");
        });
    } else {
        console.error("Signup button not found. Check the ID.");
    }
});


document.addEventListener("DOMContentLoaded",(event)=>{
   const signUpBtn = document.getElementById("signUpbtn")
   signUpBtn.addEventListener("click",()=>{
    event.preventDefault()
    window.location.href="signup.html"
   })
})



