let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

let gendermaleE1 = document.getElementById("gendermale");
let femaleE1 = document.getElementById("genderfemale");
let workingstatusE1 = document.getElementById("status");
let myFormEl = document.getElementById("myForm");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
    //   console.log(event.target.value);
});

emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
    //   console.log(event.target.value);
});
workingstatusE1.addEventListener("change", function(event) {
    formData.status = event.target.value;
});
gendermaleE1.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});
femaleE1.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

function validateFormData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

function submitformData() {
    let options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 2d6ef02742d9f8eabbfcfed2691425895a9b3d2a811cf0b2962d9e828a89ef91"

        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            if (jsonData.code === 422) {

                if (jsonData.data[0].message === "has already been taken" && jsonData.data[0].field === "email") {
                    emailErrMsgEl.textContent = "Email  already exists";
                }
            }
            //  console.log(jsonData);

        });

}
myFormEl.addEventListener("submit", function(event) {
    if (formData.name === "" || formData.email === "") {
        alert("Enter the text");
        return;
    }
    event.preventDefault();
    validateFormData(formData);
    submitformData(formData);
});
