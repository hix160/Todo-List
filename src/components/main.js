


class Main {
    constructor(sidebar, dataManager){
        this.sidebar = sidebar;
        this.dataManager = dataManager;
        this.sidebar.setButtonClickCallback(this.handleSideBarButtonClick);
        this.mainContainer = document.querySelector("main");
        this.createCard();
    };

    handleSideBarButtonClick = (buttonId) => {
        console.log(`Button clicked: ${buttonId}`);

        this.loadContent(buttonId); // Load content based on button ID
    };

    loadContent(buttonId) {
        // Clear the main container
        
        if(buttonId === "inbox") {
            this.loadInbox()
            return;
        }
        // Load content based on the clicked button ID
        const content = document.createElement("div");
        content.textContent = `Content for ${buttonId}`;
        this.mainContainer.appendChild(content);
    };

    loadInbox() {
        const button = document.createElement("button");
        const mainTop = document.querySelector(".main-top")

        button.textContent = "add task"
        button.addEventListener("click", ()=> {
            this.addTask();
        })
        

        mainTop.appendChild(button);
    }

    addTask() {
        // Create the form element
        if(document.querySelector("#taskForm") ==! null) {
            document.querySelector("#taskForm").style.display = "active";
        }
        

        const form = document.createElement("form");
        form.setAttribute("id", "taskForm");
    
        // Create a label and input for Task Title
        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "taskTitle");
        titleLabel.textContent = "Task Title:";
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "taskTitle");
        titleInput.setAttribute("name", "taskTitle");
        titleInput.setAttribute("required", true); // Making title required
    
        // Create a label and textarea for Task Description
        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "taskDescription");
        descriptionLabel.textContent = "Task Description:";
        const descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("id", "taskDescription");
        descriptionInput.setAttribute("name", "taskDescription");
        descriptionInput.setAttribute("required", true); // Making description required
    
        // Create a label and dropdown for Task Priority (optional)
        const priorityLabel = document.createElement("label");
        priorityLabel.setAttribute("for", "taskPriority");
        priorityLabel.textContent = "Task Priority:";
        const prioritySelect = document.createElement("select");
        prioritySelect.setAttribute("id", "taskPriority");
        prioritySelect.setAttribute("name", "taskPriority");
    
        // Add options for Task Priority
        const lowOption = document.createElement("option");
        lowOption.setAttribute("value", "low");
        lowOption.textContent = "Low";
        const medOption = document.createElement("option");
        medOption.setAttribute("value", "medium");
        medOption.textContent = "Medium";
        const highOption = document.createElement("option");
        highOption.setAttribute("value", "high");
        highOption.textContent = "High";
    
        // Append options to the dropdown
        prioritySelect.appendChild(lowOption);
        prioritySelect.appendChild(medOption);
        prioritySelect.appendChild(highOption);
    
        // Create a submit button
        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.textContent = "Add Task";
    
        // Append all elements to the form
        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(document.createElement("br"));
    
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(document.createElement("br"));
    
        form.appendChild(priorityLabel);
        form.appendChild(prioritySelect);
        form.appendChild(document.createElement("br"));
    
        form.appendChild(submitButton);
    
        // Append the form to the document body (or any specific element)
        document.body.appendChild(form);
    
        // Handle form submission
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the form from submitting the traditional way
    
            // Collect the data from the form
            const taskTitle = titleInput.value;
            const taskDescription = descriptionInput.value;
            const taskPriority = prioritySelect.value;
            
            const task = {
                taskTitle,
                taskDescription,
                taskPriority
            };

            this.dataManager.addData("tasks", task)

            

            console.log(JSON.parse(localStorage.getItem("tasks")));

            // Log the task data (you could save it to LocalStorage or process it here)
            
    
            // Clear the form after submission (optional)
            form.reset();
            form.style.display = "none";
        });
    }

    createCard() {
        // Get the data from the local storage
        const data = this.dataManager.getData("tasks"); // Assuming dataManager is set up
        console.log(data);
    
        // Get or create a container for the cards
        let container = document.getElementById("cardContainer");
        if (!container) {
            container = document.createElement("div");
            container.setAttribute("id", "card-container");
            ; // Optional: spacing between cards
            this.mainContainer.appendChild(container);
        }
    
        // Clear existing cards to avoid duplicates
        container.innerHTML = "";
    
        // Loop through the data array and create a card for each task
        data.forEach(task => {
            // Create a card element
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.border = "1px solid #ccc";
            card.style.borderRadius = "5px";
            card.style.padding = "10px";
            card.style.width = "200px";
            card.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    
            // Add the task title
            const title = document.createElement("h3");
            title.textContent = task.taskTitle || "No Title";
            card.appendChild(title);
    
            // Add the task description
            const description = document.createElement("p");
            description.textContent = task.taskDescription || "No Description";
            card.appendChild(description);
    
            // Add the task priority
            


            const priority = document.createElement("p");
            priority.textContent = `Priority: ${task.taskPriority || "None"}`;
            priority.style.color = this.getPriorityColor(task.taskPriority); // Add color based on priority

            const container2 = document.createElement("div");
            const removeButton = document.createElement("button");
            removeButton.textContent = "remove";

            //removeButton.addEventListener("click", )
            container2.appendChild(priority);
            container2.appendChild(removeButton)

            card.appendChild(container2);
    
            // Append the card to the container
            container.appendChild(card);
        });
    }
    
    // Helper function to determine priority color
    getPriorityColor(priority) {
        switch (priority.toLowerCase()) {
            case "low":
                return "green";
            case "medium":
                return "orange";
            case "high":
                return "red";
            default:
                return "black";
        }
    }

}

export default Main;