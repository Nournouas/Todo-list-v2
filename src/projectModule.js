export function createProject(title, tasks = []) {
    let _title = title;
    let _tasks = tasks;

    return {
        getTitle: () => _title,
        getTasks: () => [..._tasks],

        editTitle: (newTitle) => _title = newTitle,
        addTask: (newTask) => _tasks.push(newTask),
        removeTask: (removeTask) => {
            const index = _tasks.indexOf(removeTask);
            if (index !== -1) _tasks.splice(index, 1);
        },
        editTask: (task, title) => {
            const index = _tasks.indexOf(task);
            if (index !== -1 && typeof task.editTitle === "function") {
                task.editTitle(title);
            }
        }
    };
}