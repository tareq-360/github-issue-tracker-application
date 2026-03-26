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
        const wrongInfo = document.getElementById("wrongInfo");
        wrongInfo.classList.remove("hidden");
        return;
    }

})

const issues = document.getElementById("issuesCount");
const card = document.getElementById("card");
// button active status manage

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const removeActiveClass = () => {

    // allBtn.classList.add("btnDeactive");
    openBtn.classList.add("btnDeactive");
    closedBtn.classList.add("btnDeactive");
    if (allBtn.addEventListener("click", () => {
        allBtn.classList.remove("btnDeactive");
        openBtn.classList.add("btnDeactive");
        closedBtn.classList.add("btnDeactive");
        console.log("all Button Clicked");

    }));
    else if (openBtn.addEventListener("click", () => {
        openBtn.classList.remove("btnDeactive");
        allBtn.classList.add("btnDeactive");
        closedBtn.classList.add("btnDeactive");
        console.log("Open Button Clicked");

    }));
    else if (closedBtn.addEventListener("click", () => {
        closedBtn.classList.remove("btnDeactive");
        allBtn.classList.add("btnDeactive");
        openBtn.classList.add("btnDeactive");
        console.log("Closed Button Clicked");

    }));

}
removeActiveClass();

const allIssues = () => {
    const url = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            displayIssues(data.data);
            openIssues(data.data);
        });

}

const displayIssues = (issue) => {
    // console.log();
    const totalIssue = issue.length;
    // const issues = document.getElementById("issuesCount");
    issues.innerText = `${totalIssue} Issues`;
    card.innerHTML = "";
    issue.forEach(data => {

        // console.log(data.id);


        const newElement = document.createElement("div");
        newElement.innerHTML = `
            <div class="card bg-white rounded-md shadow-md p-5" onclick="my_modal_5.showModal()">
                    <div class="flex  justify-between space-y-5">
                        <img class="w-10 h-10 ${(data.status == "open") ? "bg-green-400" : "bg-red-300"} p-2 rounded-full" src="${(data.status == "open") ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                        <p class="btn btn-primary">${data.priority}</p>
                    </div>
                    <div class=" space-y-4">
                        <h3 class="font-bold">${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="flex space-x-2">
                            
                            ${wordSyno(data.labels)}
                        </div>
                        <hr>
                        <p>#1 by ${data.author}</p>
                        <p>${data.createdAt}</p>

                    </div>
                </div>
        `;
        newElement.addEventListener("click", () => {
            modal(data.id);
        });

        card.append(newElement);

    });

}

const wordSyno=(syno)=>{
    const htmlElement=syno.map((el)=>
        `<span class="btn rounded-lg  bg-orange-200">${el}</span>`);
    return htmlElement.join(" ");
}

const openIssues = (issue) => {
    // console.log(issue);
    allBtn.addEventListener("click", () => {
        allIssues();
    })
    openBtn.addEventListener("click", () => {
        let i = 0;
        card.innerHTML = "";
        issue.forEach(data => {
            // console.log(open.status);
            if (data.status == "open") {
                i++;
                const newElement = document.createElement("div");
                newElement.innerHTML = `
            <div class="card bg-white rounded-md shadow-md p-5">
                    <div class="flex  justify-between space-y-5">
                        <img class="w-10 h-10 ${(data.status == "open") ? "bg-green-400" : "bg-red-300"} p-2 rounded-full" src="${(data.status == "open") ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                        <p class="btn btn-primary">${data.priority}</p>
                    </div>
                    <div class=" space-y-4">
                        <h3 class="font-bold">${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="flex space-x-2">
                            ${wordSyno(data.labels)}
                        </div>
                        <hr>
                        <p>#1 by ${data.author}</p>
                        <p>${data.createdAt}</p>

                    </div>
                </div>
                `;
                newElement.addEventListener("click", () => {
                    modal(data.id);
                });
                card.append(newElement);

            }
        })
        // console.log(i);

        issues.innerText = `${i} Issues`;
    })
    closedBtn.addEventListener("click", () => {
        let i = 0;
        card.innerHTML = "";
        issue.forEach(data => {
            // console.log(open.status);
            if (data.status == "closed") {
                i++;
                const newElement = document.createElement("div");
                newElement.innerHTML = `
            <div class="card bg-white rounded-md shadow-md p-5">
                    <div class="flex  justify-between space-y-5">
                        <img class="w-10 h-10 ${(data.status == "open") ? "bg-green-400" : "bg-red-300"} p-2 rounded-full" src="${(data.status == "open") ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                        <p class="btn btn-primary">${data.priority}</p>
                    </div>
                    <div class=" space-y-4">
                        <h3 class="font-bold">${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="flex space-x-2">
                            ${wordSyno(data.labels)}
                        </div>
                        <hr>
                        <p>#1 by ${data.author}</p>
                        <p>${data.createdAt}</p>

                    </div>
                </div>
                `;
                newElement.addEventListener("click", () => {
                    modal(data.id);
                });
                card.append(newElement);

            }
        })
        // console.log(i);

        issues.innerText = `${i} Issues`;
    })



}

const modal = (id) => {
    // id.forEach(no => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            showModal(data.data);

            // })

        })
}

const showModal = (data) => {
    const modal = document.getElementById("modal");
    const newElement = document.createElement("div");
    modal.innerHTML = "";
    // console.log(data);
    newElement.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-lg font-bold">${data.title}</h3>
                <div class="flex gap-3">
                    <p class="bg-green-400 ${(data.status=="closed") ? "bg-red-400" : "bg-green-400"} text-white rounded-full px-3 text-center flex items-center">${data.status}</p>
                    <p class="">Opened by ${data.author}</p>
                    <p class="">${data.updatedAt}</p>
                </div>
                <div class="flex gap-3">
                    ${wordSyno(data.labels)}
                </div>
                <p class="py-4">${data.description}
                </p>
                <div class="flex justify-start items-center gap-40 bg-base-200 rounded-md p-5">
                    <p>Assignee: <br> <span class="font-bold ">${data.assignee}</span></p>
                    <p>Priority: <br> <span class="bg-red-400 text-white px-3 rounded-full">${data.priority}</span></p>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-primary">Close</button>
                    </form>
                </div>
            </div>
    `

    modal.append(newElement);
    my_modal_5.showModal()



}

document.getElementById("inputBtn").addEventListener("click",()=>{
    const input=document.getElementById("inputData");
    const inputValue=input.value.trim().toLowerCase();
    // console.log(inputValue);
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        displayIssues(data.data);
    })

    allBtn.classList.add("btnDeactive");
    openBtn.classList.add("btnDeactive");
    closedBtn.classList.add("btnDeactive");

    input.value="";
})
allIssues();
