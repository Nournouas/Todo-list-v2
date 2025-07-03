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
    const projectButton = createElement("input", ["submit-button", "project-button"], "", {value: "Create project", type: "submit"});
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

export function makeNewTaskDiv(){
    const newTaskform = createElement("form", ["new-task-form"], "", {});

    const inputDivTitle = createElement("div", ["input-div", "vertical"], "", {id: "task-title-div"});
    const nameLabel = createElement("label", ["input-label"], "Task:", {for: "task-title-input"});
    const taskTitleInput = createElement("input", ["text-input"], "", {placeholder: "Enter task name", type: "text", id: "task-title-input", required: true});
    inputDivTitle.appendChild(nameLabel);
    inputDivTitle.appendChild(taskTitleInput);

    const inputDivDescription = createElement("div", ["input-div", "vertical"], "", {id: "task-description-div"});
    const descriptionLabel = createElement("label", ["input-label"], "Description:", {for: "task-description-input"});
    const taskDescriptionInput = createElement("textarea", ["text-input"], "", {placeholder: "Enter task description", id: "task-description-input", required: true});
    inputDivDescription.appendChild(descriptionLabel);
    inputDivDescription.appendChild(taskDescriptionInput);
    
    const inputDivDate = createElement("div", ["input-div", "vertical"], "", {id: "task-date-div"});
    const DateLabel = createElement("label", ["input-label"], "Due date:", {for: "task-date-input"});
    const dateInput = createElement("input", ["date-input"], "", {id: "task-date-input", type: "date", required: true});
    inputDivDate.appendChild(DateLabel);
    inputDivDate.appendChild(dateInput);

    const inputDivPriority = createElement("div", ["input-div", "vertical"], "", {id: "task-priority-div"});
    const priorityLabel = createElement("label", ["input-label"], "Priority", {for: "task-priority-input"});
    const priorityInput = createElement("select", ["select-input"], "", {id:"task-priority-input", required: true});
    const priorityLow = createElement("option", ["select-option"], "Low", {value: "low"});
    const priorityMid = createElement("option", ["select-option"], "Medium", {value: "Medium"});
    const priorityHigh = createElement("option", ["select-option"], "High", {value: "High"});
    priorityInput.appendChild(priorityMid);
    priorityInput.appendChild(priorityLow);
    priorityInput.appendChild(priorityHigh);
    inputDivPriority.appendChild(priorityLabel);
    inputDivPriority.appendChild(priorityInput);

    const submitTask = createElement("input", ["submit-button"], "Add Task", {type: "submit"})

    newTaskform.appendChild(inputDivTitle);
    newTaskform.appendChild(inputDivDescription);
    newTaskform.appendChild(inputDivDate);
    newTaskform.appendChild(inputDivPriority);
    newTaskform.appendChild(submitTask);

    return newTaskform;

}

export function makeTasksGrid () {
    const tasksGrid = createElement("div", ["tasks-grid"], "", {});

    return tasksGrid;
}

export function makeTaskCard (title = "", description = "", date = "", priority = ""){
    const taskCard = createElement("div", ["task-card"], "", {});
    
    const taskTitle = createElement("h4", ["task-card-title"], String(title), {});
    const taskDescription = createElement("p", ["task-card-description"], String(description), {});
    const taskBotDiv = createElement("div", ["task-card-bot-div"], "", {});
    const taskDate = createElement("p", ["task-card-date"], `Due: ${String(date)}`, {});
    const taskPriority = createElement("p", ["task-card-priority"], `Priority: ${String(priority)}`, {})

    taskBotDiv.appendChild(taskPriority);
    taskBotDiv.appendChild(taskDate);

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskBotDiv)

    return taskCard;
}