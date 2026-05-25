// 1. Výběr prvků z HTML stránky
const taskTitleInput = document.getElementById('task-title');
const taskCategorySelect = document.getElementById('task-category');
const taskPrioritySelect = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-btn');
const tasksContainer = document.getElementById('task-container');

// 2. Funkce pro přidání nového úkolu
function addNewTask() {
    const titleText = taskTitleInput.value.trim();
    const categoryText = taskCategorySelect.value;
    const priorityText = taskPrioritySelect.value;

    // Kontrola, zda uživatel vůbec něco zadal
    if (titleText === "") {
        alert("Please enter a task title!");
        return;
    }

    // Vytvoření HTML struktury pro nový úkol
    const taskArticle = document.createElement('article');
    taskArticle.className = 'task-item';

    // Převedení priority na malé písmeno kvůli CSS třídě (low, medium, high)
    const priorityClass = priorityText.toLowerCase();

    taskArticle.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="task-checkbox">
            <div class="task-details">
                <h3>${titleText}</h3>
                <div class="task-tags">
                    <span class="tag tag-category">${categoryText}</span>
                    <span class="tag tag-priority-${priorityClass}">${priorityClass}</span>
                </div>
            </div>
        </div>
        <button class="btn-delete">Delete</button>
    `;

    // Přidání úkolu do seznamu na stránce
    tasksContainer.appendChild(taskArticle);

    // Vyčištění textového políčka po přidání úkolu
    taskTitleInput.value = "";
}

// 3. Spuštění funkce po kliknutí na tlačítko "Add Task"
addTaskBtn.addEventListener('click', addNewTask);

// 4. Funkce pro mazání úkolů a zaškrtávání (Event Delegation)
tasksContainer.addEventListener('click', function(event) {
    // Pokud uživatel kliknul na tlačítko Delete
    if (event.target.classList.contains('btn-delete')) {
        const taskItem = event.target.closest('.task-item');
        taskItem.remove();
    }

    // Pokud kliknul na checkbox (zaškrtávací políčko)
    if (event.target.classList.contains('task-checkbox')) {
        // Najdeme .task-left obal pro daný úkol a v něm zacílíme h3 text
        const taskLeft = event.target.closest('.task-left');
        const taskTitle = taskLeft.querySelector('h3');
        
        if (event.target.checked) {
            taskTitle.style.textDecoration = 'line-through';
            taskTitle.style.opacity = '0.5';
        } else {
            taskTitle.style.textDecoration = 'none';
            taskTitle.style.opacity = '1';
        }
    }
});