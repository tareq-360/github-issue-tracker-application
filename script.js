// Sign in method code
document.getElementById("signInBtn").addEventListener("click", () => {
    // console.log("SignIn Clicked");
    const userName = document.getElementById("inputUserName");
    const password = document.getElementById("inputPassword");
    // console.log(`UserName = ${userName.value} Password = ${password.value}`);
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

const allIssues=()=>{
    const url= fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(data=>displayIssues(data.data));

}

const displayIssues=(issue)=>{
    // console.log();
    const totalIssue=issue.length;
    card.innerHTML="";
    issue.forEach(data => {
        
        // console.log(data.id);
        const card=document.getElementById("card");
        
        const newElement=document.createElement("div");
        newElement.innerHTML=`
            <div class="card bg-white rounded-md shadow-md p-5">
                    <div class="flex  justify-between space-y-5">
                        <img class="w-10 h-10 ${(data.status=="open") ? "bg-green-400" : "bg-red-300"} p-2 rounded-full" src="${(data.status=="open") ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                        <p class="btn btn-primary">${data.priority}</p>
                    </div>
                    <div class=" space-y-4">
                        <h3 class="font-bold">${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="flex space-x-2">
                            <p class="bg-red-200 p-1 rounded-lg">BUG</p>
                            <p class="bg-red-200 p-1 rounded-lg">HELP WANTED</p>
                        </div>
                        <hr>
                        <p>#1 by ${data.author}</p>
                        <p>${data.createdAt}</p>

                    </div>
                </div>
        `
        card.append(newElement);

    });
}
allIssues();
