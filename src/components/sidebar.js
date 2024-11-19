import today_icon from '../images/today_icon.svg';
import upcoming_icon from '../images/upcoming_icon.svg';
import anytime_icon from '../images/anytime_icon.svg';
import someday_icon from '../images/someday_icon.svg';
import logbook_icon from '../images/logbook_icon.svg';
import add_icon from '../images/add_icon.svg';



class Sidebar {
    constructor() {
        // Store the tabs and the sidebar container
        this._tabs = [
            ["Inbox", add_icon]
            //["Today", today_icon],
            //["Upcoming", upcoming_icon],
            //["Anytime", anytime_icon],
            //["Someday", someday_icon],
            //["Logbook", logbook_icon]
        ];

        this.buttonClickCallback = null;

        this.topSidebarContainer = document.querySelector(".sidebar.top");
        this.bottomSidebarContainer = document.querySelector(".sidebar.bottom");
        // Initialize the sidebar
        this.loadSideBar();
        this.loadSideBarBottom();
    }

    setButtonClickCallback(callback) {
        // Set the callback to notify when a button is clicked
        this.buttonClickCallback = callback;
    }


    loadSideBarBottom = () => {
        this.bottomSidebarContainer.innerHTML = "";
        const button = document.createElement("button");
        const iconContainer = document.createElement("img");
        const textContainer = document.createElement("div");

        iconContainer.src = add_icon;
        textContainer.textContent = "new project";

        iconContainer.classList.add("icon");
        textContainer.classList.add("text");

        button.id = "new-list"
        button.appendChild(iconContainer);
        button.appendChild(textContainer);

        this.bottomSidebarContainer.appendChild(button);

    }

    

    loadSideBar = () => {
       
        this.topSidebarContainer.innerHTML = "";

        // Iterate through each tab and create a button
        this._tabs.forEach(tab => {
            const [name, iconPath] = tab; // Destructure name and iconPath
            const button = this.createSidebarButton(name, iconPath);
            button.addEventListener("click", ()=> {
                if(this.buttonClickCallback) {
                    this.buttonClickCallback(button.id);
                }
                
            });
            this.topSidebarContainer.appendChild(button); // Append the button to the container
        });
    };

    createSidebarButton = (name, iconPath) => {
        // Create elements
        const button = document.createElement("button");
        const iconContainer = document.createElement("img");
        const textContainer = document.createElement("div");

        // Set attributes and content

        iconContainer.src = iconPath;
        iconContainer.alt = `${name} icon`; // Add alt text for accessibility
        textContainer.textContent = name; // Set the tab name as text

        // Add CSS classes for styling (if applicable)
        button.classList.add("sidebar-button");
        button.id = name.toLowerCase();
        iconContainer.classList.add("icon");
        textContainer.classList.add("text");

        // Append the icon and text to the button
        button.appendChild(iconContainer);
        button.appendChild(textContainer);

        return button; // Return the completed button
    };

    get tabs(){
        return this.tabs;
    };
    

};

export default Sidebar;
