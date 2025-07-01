export function createTask(title, description, date, priority) {
    let _title = title;
    let _description = description;
    let _date = date;
    let _priority = priority;

    return {
        getTitle: () => _title,
        getDescription: () => _description,
        getDate: () => _date,
        getPriority: () => _priority,

        editTitle: (newTitle) => _title = newTitle,
        editDescription: (newDescription) => _description = newDescription,
        editDate: (newDate) => _date = newDate,
        editPriority: (newPriority) => _priority = newPriority
    };
}