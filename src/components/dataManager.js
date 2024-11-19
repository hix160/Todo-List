
class DataManager{
    constructor(){

    };
    saveData(dataId, data) {

        localStorage.setItem(dataId, JSON.stringify(data));
    }

    getData(dataId) {
        if(localStorage.getItem(dataId)===null) {
            return [];
        }
        const storedData = localStorage.getItem(dataId);
        return storedData ? JSON.parse(storedData):null;
    }

    removeData(dataId, index) {
        // Get the current data array from localStorage
        let data = this.getData(dataId);
    
        // Check if data exists and index is valid
        if (Array.isArray(data) && index >= 0 && index < data.length) {
            // Remove the item at the specified index
            data.splice(index, 1);
    
            // Save the updated array back to localStorage
            this.saveData(dataId, data);
        } else {
            console.error("Invalid index or data does not exist");
        }
    }

    removeItem(dataId) {
        localStorage.removeItem(dataId);
    }

    addData(dataId, new_data) {
        let data = this.getData(dataId)
        data.push(new_data);
        this.saveData(dataId, data);

    }

    clearData() {
        localStorage.clear();
    }
}

export default DataManager;