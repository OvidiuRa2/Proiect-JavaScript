"use strict";
class Task {
    constructor(title) {
        this.title = title;
        this.done = false;
    }

};

class TaskManager {
    constructor(idContainer, idTemplate) {
        this.template = new Template(idTemplate, this.fillItem.bind(this));
        this.container = document.querySelector(idContainer);

        this.addButton = document.querySelector(".add");
        this.addButton.addEventListener("click", this.onAddTask.bind(this));

        this.container.addEventListener("click", this.changeStatus.bind(this));

        document.querySelector(".input").addEventListener("keypress", this.enterPressed.bind(this));

        this.restoreContent();
    }

    onAddTask() {
        try {
            this.addTask();
        } catch (e) {
            alert(e.message);
        }
    }

    enterPressed(event) {
        console.log(21);
        if (event.key == "Enter") {
            this.onAddTask();
        }
    }

    changeStatus(event) {
        this.finishTask(event);
        this.deleteTask(event);
    }

    finishTask({ target }) {

        const index = target.parentElement.dataset.index;

        if (index != undefined)
            if (data[index].done == false) {
                data[index].done = true;
                this.save();
                target.parentElement.classList.add("done");
            } else {
                data[index].done = false;
                this.save();
                target.parentElement.classList.remove("done");
            }


    }

    deleteTask({ target }) {

        const index = target.parentElement.dataset.index;
        if (target.classList[0] == "delete") {
            target.parentElement.classList.add("delete");
            data.splice(index, 1);
            this.save();
            this.restoreContent();

        }
    }

    restoreContent() {
        const taskList = document.querySelector(".task-list");
        while (taskList.lastElementChild) {
            taskList.removeChild(taskList.lastElementChild);
        }
        const result = this.template.fillCollection(data);
        taskList.appendChild(result);

    }

    fillItem(itemData, result, index) {
        if (itemData.done == true) {
            result.querySelector(".task").classList.add("done");
        }
        result.querySelector(".task").dataset.index = index;
        result.querySelector(".title").textContent = itemData.title;

    }

    verifyDuplicateTask(text) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title == text) {
                return true;
            }
        }
        return false;
    }

    addTask() {
        const input = document.querySelector("input").value;

        if (input != "" && this.verifyDuplicateTask(input) == false) {
            data.push(new Task(input));
            this.save();
            this.restoreContent();
            document.querySelector("input").value = "";
        } else {
            throw new Error("Input invalid!");
        }
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(data));
    }
};

const tm = new TaskManager("#container", "#template");



