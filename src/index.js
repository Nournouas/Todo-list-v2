import "./styles.css";
import { makeHeader, makeNewProjectCard, makeProjectDiv, makeProjectViewDiv} from "./DOM";
import { createProject } from "./projectModule";
import { createTask } from "./taskModule";

const applicationModule = (function () {
    let allProjects = [];
    document.body.appendChild(makeHeader());
    addProjectButtonEventListener();



    //this function adds the event listener to the add project button
    function addProjectButtonEventListener(){
        const addProjectButton = document.querySelector(".button-add-proj");
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
                    projectButtonEventListener()
                }
                
            };

        });
    }

    function doesProjectExist(name){
        let flag = false;
        for (let i = 0; i < allProjects.length ; i++){
            if(allProjects[i].getTitle() === name){
                flag = true;
            }
        }
        return flag;
    }

    function submitProject(e){
        e.preventDefault();
        const projectTitleInput = document.querySelector("#project-title-input")
        const newProjectTitle = projectTitleInput.value;
        if(!doesProjectExist(newProjectTitle)){
            const newProject = createProject(newProjectTitle, []);
            allProjects.push(newProject);
            removeElementByClass(".new-project-form");
            return true;
        }else{
            alert("project already exists");
            return false;
        }
        
        
    }

    function removeElementByClass(element) {
        const elementToRemove = document.querySelector(element);
        if (elementToRemove){
            document.body.removeChild(elementToRemove);
        }
    }

    function populateProjectsOnHeader(projects) {
        const headerProjectsDiv = document.querySelector(".all-projects-div");
        headerProjectsDiv.innerHTML = "";

        for (let i = 0; i < projects.length ; i++){
            const projectDiv = makeProjectDiv(projects[i].getTitle());
            headerProjectsDiv.appendChild(projectDiv);
        }
    }

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

    function mountProject(projectTitle){
        let projectObj = {};

        for (let i = 0; i < allProjects.length ; i++){
            if(allProjects[i].getTitle() === projectTitle){
                projectObj = allProjects[i];
            }
        }
        
        const projectViewDiv = makeProjectViewDiv(projectObj.getTitle());
        document.body.appendChild(projectViewDiv);
    }

    

})();