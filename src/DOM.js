function createElement(type, classes = [], content = "", attributes = {}){
    const element = document.createElement(type);
    
    element.classList.add(...classes);

    element.textContent = content ?? "";

    for (const [key, value] of Object.entries(attributes)){
        element.setAttribute(key, value);
    }

    return element
}


function makeProjectAddButton(){
    const div = createElement("div", ["project-add-div"], "", {});
    const addProjectHeader = createElement("h2", ["add-project-header"], "Create Project", {});
    const addProjectButton = createElement("button", ["button-add-proj"], "+", {})
    div.appendChild(addProjectHeader);
    div.appendChild(addProjectButton);
    return div;
}

function makeProjectDiv(){
    const projectsDiv = createElement("div", ["project-parent-div"], "", {});
    projectsDiv.appendChild(makeProjectAddButton());
    return projectsDiv;
}

export function makeHeader(){
    const header = createElement("header", ["header"], "", {});
    const titleDiv = createElement("div", ["div-title-header"], "", {});
    const title = createElement("h1", ["header-title"], "TODO", {});
    titleDiv.appendChild(title);
    header.appendChild(titleDiv);
    header.appendChild(makeProjectDiv());
    return header;
}