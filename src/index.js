import "./styles.css";
import { makeHeader, makeNewProjectCard, makeProjectDiv, makeProjectViewDiv, makeProjectsHeader, makeNewTaskDiv, makeTasksGrid, makeTaskCard} from "./DOM";
import { createProject } from "./projectModule";
import { createTask } from "./taskModule";

const applicationModule = (function () {
    let allProjects = [];
    let selectedProject = {};
    document.body.appendChild(makeHeader());
    addProjectButtonEventListener();

    retrieveProjectList();



    //this function adds the event listener to the add project button
    function addProjectButtonEventListener(){
        const addProjectButton = document.querySelector(".button-add-proj");
        selectedProject = {};
        addProjectButton.addEventListener("click", () => {
            if (document.querySelector(".new-project-form")) return;
            addProjectButton.classList.add("hide");
            removeElementByClass(".project-view-div");
            const newProjectDiv = makeNewProjectCard();

            // append class as hidden
            newProjectDiv.classList.add("low-opacity");
            document.body.appendChild(newProjectDiv);

            // animate to show
            requestAnimationFrame(() => {
                newProjectDiv.classList.remove("low-opacity");
            });

            const addProjectForm = document.querySelector(".new-project-form");
            addProjectForm.onsubmit = (e) => {
                if (submitProject(e)){
                    addProjectButton.classList.remove("hide");
                    populateProjectsOnHeader(allProjects);
                    
                }
                
            };

        });
    }

    //check if a project exists
    function doesProjectExist(name){
        let flag = false;
        for (let i = 0; i < allProjects.length ; i++){
            if(allProjects[i].getTitle() === name){
                flag = true;
            }
        }
        return flag;
    }


    //remove element by class
    function removeElementByClass(element) {
        const elementToRemove = document.querySelector(element);
        if (elementToRemove){
            document.body.removeChild(elementToRemove);
        }
    }

    //add projects to the header and add event listeners to them
    function populateProjectsOnHeader(projects) {
        const headerProjectsDiv = document.querySelector(".all-projects-div");
        headerProjectsDiv.innerHTML = "";
        headerProjectsDiv.appendChild(makeProjectsHeader());

        for (let i = 0; i < projects.length ; i++){
            const projectDiv = makeProjectDiv(projects[i].getId(), projects[i].getTitle());
            headerProjectsDiv.appendChild(projectDiv);
            deleteProjectEventListener(projects[i].getId());
        }

        projectButtonEventListener();
    }

    //add event listener to the project button on the header
    function projectButtonEventListener() {
        const projectDivs = document.querySelectorAll(".project-parent-div");

        projectDivs.forEach(projectParentDiv => {
            
            projectParentDiv.addEventListener("click", () => {

                removeElementByClass(".project-view-div");
                removeElementByClass(".new-project-form");

                //check if the add project button is hidden
                if (Array.from(document.querySelector(".button-add-proj").classList).includes("hide")){
                    document.querySelector(".button-add-proj").classList.toggle("hide");
                }

                if (document.querySelector(".project-view-div")) return;
                mountProject(projectParentDiv.id);
            });
        });

    }

    function refreshProjectView(projectObj){
        removeElementByClass(".project-view-div");
        if (document.querySelector(".project-view-div")) return;
        mountProject(projectObj.getId());


    }

    //returns project object based on an id
    function projectByID(projectID){
        const projectObj = allProjects.find(p => p.getId() === projectID);
        if (!projectObj) return;
        return projectObj

    }

    //put the project on full display
    function mountProject(projectID){
        const projectObj = projectByID(projectID);
        selectedProject = projectObj;
        const projectViewDiv = makeProjectViewDiv(projectObj.getTitle());
        const taskList = selectedProject.getTasks();
        projectViewDiv.appendChild(makeNewTaskDiv());
        //add event --------------------------------------------------------------------
        document.body.appendChild(projectViewDiv);
        newTaskEventListener();

        projectViewDiv.appendChild(makeTasksGrid());
        const taskGrid = document.querySelector(".tasks-grid");

        for (let i = 0; i < taskList.length ; i++){
            const task = taskList[i];
            const taskCard = makeTaskCard(task.getTitle(), task.getDescription(), task.getDate(), task.getPriority());
            taskGrid.appendChild(taskCard);
        }
        
    }

    //add an event listener to delete button
    function deleteProjectEventListener(projectID){
        const deleteButton = document.querySelector(`.delete-button[id="${projectID}"]`);
        const projectObj = projectByID(projectID)

        deleteButton.addEventListener("click", ()=> {
            removeProject(projectObj);
            removeProjectStorage(projectID);
            populateProjectsOnHeader(allProjects);
            
        });
    }

    function removeProjectStorage (projectID){
        if (storageAvailable("localStorage")){
            localStorage.removeItem(projectID);
        }
    }


    //remove project from list of projects
    function removeProject(projectObj){
        for (let i = 0 ; i < allProjects.length; i++){
                if (projectObj === allProjects[i]){
                    allProjects.splice(i, 1);
                }
            }
    }

    function newTaskEventListener() {
        const taskForm = document.querySelector(".new-task-form");

        taskForm.onsubmit = (e) => {
            submitTask(e);
        };
    }

    //Create a new project, handles the new project form
    function submitProject(e){
        e.preventDefault();
        const projectTitleInput = document.querySelector("#project-title-input")
        const newProjectTitle = projectTitleInput.value;
        if(!doesProjectExist(newProjectTitle)){
            const newProject = createProject(newProjectTitle, [], Date.now());
            allProjects.push(newProject);
            storeProject(newProject);
            removeElementByClass(".new-project-form");
            return true;
        }else{
            alert("project already exists");
            return false;
        }
        
        
    }

    function refreshProjectList(){
        for (let i = 0; i < allProjects.length ; i++){
            if (allProjects[i].getId === selectedProject.getId){
                allProjects[i] = selectedProject;
            }
        }
    }

    function submitTask(e){
        e.preventDefault();
        const taskTitleInput = document.querySelector("#task-title-input");
        const taskdescriptionInput = document.querySelector("#task-description-input");
        const taskDateInput = document.querySelector("#task-date-input");
        const taskPriorityInput = document.querySelector("#task-priority-input");

        const newTask = createTask(taskTitleInput.value, taskdescriptionInput.value, String(taskDateInput.value), taskPriorityInput.value);
        selectedProject.addTask(newTask);
        refreshProjectList;
        refreshProjectView(selectedProject);
        storeProject(selectedProject);
    }

    function storeProject(project){
        if (storageAvailable("localStorage")){
            let friendlyJSONProject = {title: project.getTitle(), tasks: parseTasks(project.getTasks()), id: project.getId()};
            localStorage.setItem(String(project.getId()), JSON.stringify(friendlyJSONProject));
        }
    }

    //take a task and return an object friendly for JSON
    function parseTaskForJSON(task){
        const taskStringObj = {title: task.getTitle(), description: task.getDescription(), date: task.getDate(), priority: task.getPriority()};

        return taskStringObj
    }

    //This can return an object with a bunch of JSON friendly tasks
    function parseTasks (tasks){
        let tasksString = {};

        for (let i = 0; i < tasks.length ; i++){
            tasksString[i] = parseTaskForJSON(tasks[i]);
        }

        return tasksString;

    }

    function retrieveProjectList(){
        if (storageAvailable("localStorage") && window.localStorage.length != 0){
            for (let i = 0; i < localStorage.length; i++){
                let retrievedProject = JSON.parse(localStorage.getItem(localStorage.key(i)));
                let tasksList = createTaskListFromString(retrievedProject.tasks);
                let project = createProject(retrievedProject.title, tasksList, retrievedProject.id);
                allProjects.push(project);
            }
            populateProjectsOnHeader(allProjects);
        }
    }

    function createTaskListFromString(tasksStringObj){
        let tasksList = [];
        for (let i = 0; i < Object.keys(tasksStringObj).length ; i++){
            let taskObject = tasksStringObj[i];
            tasksList.push(createTaskFromString(taskObject));
        }

        return tasksList
    }

    function createTaskFromString(taskString){
        let newTaskTitle = taskString.title;
        let newTaskDescription = taskString.description;
        let newTaskDate = taskString.date;
        let newTaskPrio = taskString.priority;

        return createTask(newTaskTitle, newTaskDescription, newTaskDate, newTaskPrio);

    }


    function storageAvailable(type) {
            let storage;
            try {
                storage = window[type];
                const x = "__storage_test__";
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch (e) {
                return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
                );
            }
    }

    

})();