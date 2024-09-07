var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Get necessary elements
var skillsList = document.getElementById("skills-list");
var newSkillInput = document.getElementById("new-skill-input");
var addSkillBtn = document.getElementById("add-skill-btn");
var saveBtn = document.getElementById("save-btn");
// Function to add a new skill to the list
var addSkill = function () {
    var skill = newSkillInput.value.trim();
    if (skill !== "") {
        var li_1 = document.createElement("li");
        var span = document.createElement("span");
        span.textContent = skill;
        span.contentEditable = "true";
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn", "btn-danger", "ml-2");
        deleteBtn.addEventListener("click", function () {
            li_1.remove();
        });
        li_1.appendChild(span);
        li_1.appendChild(deleteBtn);
        skillsList.appendChild(li_1);
        newSkillInput.value = "";
    }
    else {
        alert("Please enter a valid skill!");
    }
};
var saveResume = function () {
    var name = document.getElementById("name").textContent;
    var email = document.getElementById("email").textContent;
    var phone = document.getElementById("phone").textContent;
    var education = document.getElementById("education-text")
        .textContent;
    var workExp = document.getElementById("work-exp")
        .textContent;
    var skills = __spreadArray([], skillsList.children, true).map(function (li) { return li.querySelector("span").textContent; });
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        workExp: workExp,
        skills: skills,
    };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved successfully!");
};
addSkillBtn.addEventListener("click", addSkill);
newSkillInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addSkill();
    }
});
saveBtn.addEventListener("click", saveResume);
window.addEventListener("DOMContentLoaded", function () {
    var savedResume = localStorage.getItem("resumeData");
    if (savedResume) {
        var resumeData = JSON.parse(savedResume);
        document.getElementById("name").textContent =
            resumeData.name;
        document.getElementById("email").textContent =
            resumeData.email;
        document.getElementById("phone").textContent =
            resumeData.phone;
        document.getElementById("education-text").textContent =
            resumeData.education;
        document.getElementById("work-exp").textContent =
            resumeData.workExp;
        skillsList.innerHTML = "";
        resumeData.skills.forEach(function (skill) {
            var li = document.createElement("li");
            var span = document.createElement("span");
            span.textContent = skill;
            span.contentEditable = "true";
            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("btn", "btn-danger", "ml-2");
            deleteBtn.addEventListener("click", function () {
                li.remove();
            });
            li.appendChild(span);
            li.appendChild(deleteBtn);
            skillsList.appendChild(li);
        });
    }
});
