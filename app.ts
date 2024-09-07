// Get necessary elements
const skillsList = document.getElementById("skills-list") as HTMLUListElement;
const newSkillInput = document.getElementById(
  "new-skill-input"
) as HTMLInputElement;
const addSkillBtn = document.getElementById(
  "add-skill-btn"
) as HTMLButtonElement;
const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;

// Function to add a new skill to the list
const addSkill = (): void => {
  const skill = newSkillInput.value.trim(); 

  if (skill !== "") {
    const li = document.createElement("li"); 

    const span = document.createElement("span");
    span.textContent = skill;
    span.contentEditable = "true"; 

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-2"); 

    deleteBtn.addEventListener("click", () => {
      li.remove();
    }); 

    li.appendChild(span);
    li.appendChild(deleteBtn); 

    skillsList.appendChild(li); 

    newSkillInput.value = "";
  } else {
    alert("Please enter a valid skill!");
  }
};


const saveResume = (): void => {
  const name = (document.getElementById("name") as HTMLElement).textContent;
  const email = (document.getElementById("email") as HTMLElement).textContent;
  const phone = (document.getElementById("phone") as HTMLElement).textContent;
  const education = (document.getElementById("education-text") as HTMLElement)
    .textContent;
  const workExp = (document.getElementById("work-exp") as HTMLElement)
    .textContent; 

  const skills = [...(skillsList.children as any)].map(
    (li: HTMLElement) => (li.querySelector("span") as HTMLElement).textContent
  );

  const resumeData = {
    name,
    email,
    phone,
    education,
    workExp,
    skills,
  }; 

  localStorage.setItem("resumeData", JSON.stringify(resumeData)); 

  alert("Resume saved successfully!");
};


addSkillBtn.addEventListener("click", addSkill);


newSkillInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addSkill();
  }
});


saveBtn.addEventListener("click", saveResume);


window.addEventListener("DOMContentLoaded", () => {
  const savedResume = localStorage.getItem("resumeData");
  if (savedResume) {
    const resumeData = JSON.parse(savedResume); 

    (document.getElementById("name") as HTMLElement).textContent =
      resumeData.name;
    (document.getElementById("email") as HTMLElement).textContent =
      resumeData.email;
    (document.getElementById("phone") as HTMLElement).textContent =
      resumeData.phone;
    (document.getElementById("education-text") as HTMLElement).textContent =
      resumeData.education;
    (document.getElementById("work-exp") as HTMLElement).textContent =
      resumeData.workExp; 

    skillsList.innerHTML = ""; 

    resumeData.skills.forEach((skill: string) => {
      const li = document.createElement("li"); 

      const span = document.createElement("span");
      span.textContent = skill;
      span.contentEditable = "true"; 

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn", "btn-danger", "ml-2"); 

      deleteBtn.addEventListener("click", () => {
        li.remove();
      }); 

      li.appendChild(span);
      li.appendChild(deleteBtn); 

      skillsList.appendChild(li);
    });
  }
});
