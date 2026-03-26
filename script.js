document.getElementById("signInBtn").addEventListener("click", () => {
    console.log("SignIn Clicked");
    const userName = document.getElementById("inputUserName");
    const password = document.getElementById("inputPassword");
    console.log(`UserName = ${userName.value} Password = ${password.value}`);
    if (password.value == "admin123" && userName.value == "admin") {
        const homePage = document.getElementById("homePage");
        const loginForm = document.getElementById("loginForm");
        homePage.classList.remove("hidden");
        loginForm.classList.add("hidden");
        userName.value = "";
        password.value = "";
        return;
    }
    else {
        userName.value = "";
        password.value = "";
        const wrongInfo= document.getElementById("wrongInfo");
        wrongInfo.classList.remove("hidden");
        return;
    }

})