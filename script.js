const pendingList = [];
const completedList = [];

const pendingListUl = document.getElementById("pendingList");
const completedListUl = document.getElementById("completedList");
const addButton = document.getElementById("addItemButton");
const inputField = document.getElementById("addItemInput");
const searchField = document.getElementById("searchBar");

const db = firebase.firestore().collection("todos");

const setupEventListeners = () => {
    addButton.addEventListener("click", (event) => {
        event.preventDefault();

        let newItem = inputField.value;
        addPending(newItem);
        inputField.value = "";
    });

    searchBar.addEventListener("change", (event) => {
        event.preventDefault();
        const searchValue = searchField.value;
        const filteredList = pendingList.filter(item => item.includes(searchValue));
        redisplayPending(filteredList);
    });
};

const getToDos = async () => {
    const todos = await db.get();
    todos.forEach(doc => {
        const itemObj = doc.data();
        if (itemObj.isComplete) {
            completedList.push(itemObj.item);
        } else {
            pendingList.push(itemObj.item);
        }
    });
};

const completeItem = listItem => {
    const itemValue = listItem.innerHTML;
    const pendingIndex = pendingList.indexOf(itemValue);
    pendingList.splice(pendingIndex, 1);
    completedList.push(itemValue);
    redisplay();
};

const addPending = function (itemToAdd) {
    if (itemToAdd == "") return;

    db.add({ item: itemToAdd, isComplete: false })
        .then(() => {
            pendingList.push(itemToAdd);
            redisplayPending(pendingList);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
};

const redisplay = () => {
    redisplayPending(pendingList);
    redisplayComplete(completedList);
};

const redisplayPending = listToDisplay => {
    pendingListUl.innerHTML = "";

    listToDisplay.forEach(itemToAdd => {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(itemToAdd));
        listItem.classList.add("list-group-item");
        listItem.addEventListener("click", () => completeItem(listItem));
        pendingListUl.appendChild(listItem);
    });
};

const redisplayComplete = listToDisplay => {
    completedListUl.innerHTML = "";

    listToDisplay.forEach(itemToAdd => {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(itemToAdd));
        listItem.classList.add("list-group-item");
        listItem.classList.add("disabled");
        completedListUl.appendChild(listItem);
    });
};

const main = async () => {
    setupEventListeners();
    await getToDos();
    redisplay();
};

main();