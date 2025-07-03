function createElement(type, classes = [], content = "", attributes = {}){
    const element = document.createElement(type);
    
    element.classList.add(...classes);

    element.textContent = content ?? "";

    for (const [key, value] of Object.entries(attributes)){
        element.setAttribute(key, value);
    }

    return element
}

//Make header -----------------------
function makeProjectAddButton() {
    const div = createElement("div", ["project-add-div"], "", {});
    const addProjectHeader = createElement("h2", ["add-project-header"], "Create Project", {});
    const addProjectButton = createElement("button", ["button-add-proj"], "+", {})
    div.appendChild(addProjectHeader);
    div.appendChild(addProjectButton);

    return div;
}

function makeNewProjectDiv() {
    const projectsDiv = createElement("div", ["new-project-parent-div"], "", {});
    projectsDiv.appendChild(makeProjectAddButton());

    return projectsDiv;
}

export function makeHeader() {
    const header = createElement("header", ["header"], "", {});
    const titleDiv = createElement("div", ["div-title-header"], "", {});
    const title = createElement("h1", ["header-title"], "TODO", {});
    const projectsDiv = createElement("div", ["all-projects-div"], "", {});
    const projectsHeader = createElement("h2", ["projects-section-header"], "Projects:", {});
    projectsDiv.appendChild(projectsHeader);
    titleDiv.appendChild(title);
    header.appendChild(titleDiv);
    header.appendChild(makeNewProjectDiv());
    header.appendChild(projectsDiv);

    return header;
}

export function makeProjectsHeader(){
    return createElement("h2", ["projects-section-header"], "Projects:", {});
}

//------------------------------------


export function makeNewProjectCard() {
    const newProjectForm = createElement("form", ["new-project-form", "low-opacity"], "", {});
    const inputDiv = createElement("div", ["input-div"], "", {});
    const projectLabel = createElement("label", ["input-label"], "New Project", {for: "project-title-input"});
    const projectTitleInput = createElement("input", ["text-input"], "", {placeholder: "Enter project name", type: "text", id: "project-title-input", required: true});
    const projectButton = createElement("input", ["submit-button"], "", {value: "Create project", type: "submit"});
    inputDiv.appendChild(projectLabel);
    inputDiv.appendChild(projectTitleInput);
    newProjectForm.appendChild(inputDiv);
    newProjectForm.appendChild(projectButton);

    return newProjectForm;
    
}

export function makeProjectDiv(newID, projectTitle){
    const parentProjectDiv = createElement("div", ["project-outer-div"], "", {});
    const projectDiv = createElement("div", ["project-parent-div"], "", {id: newID});
    const deleteProject = createElement("button", ["delete-button"], "🗑️", {id: newID});
    const div = createElement("div", ["project-title-div"], "", {});
    const ProjectHeader = createElement("h2", ["project-header"], projectTitle, {});
    div.appendChild(ProjectHeader);
    
    projectDiv.appendChild(div);
    parentProjectDiv.appendChild(projectDiv);
    parentProjectDiv.appendChild(deleteProject);

    return parentProjectDiv;
}

export function makeProjectViewDiv(title){
    const bigDiv = createElement("div", ["project-view-div"], "", {});
    const projectHeader = createElement("h3", ["project-view-title"], title, {});
    bigDiv.appendChild(projectHeader);

    return bigDiv
}