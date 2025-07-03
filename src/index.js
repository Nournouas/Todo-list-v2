import "./styles.css";
import { makeHeader, makeNewProjectCard, makeProjectDiv, makeProjectViewDiv, makeProjectsHeader} from "./DOM";
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


    //Create a new project, handles the new project form
    function submitProject(e){
        e.preventDefault();
        const projectTitleInput = document.querySelector("#project-title-input")
        const newProjectTitle = projectTitleInput.value;
        if(!doesProjectExist(newProjectTitle)){
            const newProject = createProject(newProjectTitle, [], Date.now());
            allProjects.push(newProject);
            removeElementByClass(".new-project-form");
            return true;
        }else{
            alert("project already exists");
            return false;
        }
        
        
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
                console.log(projectParentDiv.id);
                mountProject(projectParentDiv.id);
                
                

            });
        });

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
        const projectViewDiv = makeProjectViewDiv(projectObj.getTitle());
        document.body.appendChild(projectViewDiv);
        
    }

    //add an event listener to delete button
    function deleteProjectEventListener(projectID){
        const deleteButton = document.querySelector(`.delete-button[id="${projectID}"]`);
        const projectObj = projectByID(projectID)

        deleteButton.addEventListener("click", ()=> {
            removeProject(projectObj);
            populateProjectsOnHeader(allProjects);
            
        });
    }

    function removeProject(projectObj){
        for (let i = 0 ; i < allProjects.length; i++){
                if (projectObj === allProjects[i]){
                    allProjects.splice(i, 1);
                    
                }
            }
    }

    

})();