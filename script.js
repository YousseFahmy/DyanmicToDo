let pendingList = [];
let completedList = [];

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
        const filteredList = pendingList.filter(itemObj => itemObj.item.includes(searchValue));
        redisplayPending(filteredList);
    });
};

const getToDos = async () => {
    const todos = await db.get();
    todos.forEach(doc => {
        const itemObj = { ...doc.data(), id: doc.id };
        if (itemObj.isComplete) {
            completedList.push(itemObj);
        } else {
            pendingList.push(itemObj);
        }
    });
};

const completeItem = listItem => {
    const itemValue = listItem.innerHTML;
    const itemObj = {
        item: itemValue,
        isComplete: true,
        id: listItem.id
    };

    db.doc(listItem.id).set({ isComplete: true }, { merge: true });

    pendingList = pendingList.filter(item => item.id != listItem.id);

    completedList.push(itemObj);
    redisplay();
};

const addPending = function (itemToAdd) {
    if (itemToAdd == "") return;
    const itemObj = {
        item: itemToAdd,
        isComplete: false,
    };
    db.add(itemObj)
        .then(addedItem => {
            pendingList.push({ ...itemObj, id: addedItem.id });
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
        listItem.appendChild(document.createTextNode(itemToAdd.item));
        listItem.id = itemToAdd.id;
        listItem.classList.add("list-group-item");
        listItem.addEventListener("click", () => completeItem(listItem));
        pendingListUl.appendChild(listItem);
    });
};

const redisplayComplete = listToDisplay => {
    completedListUl.innerHTML = "";

    listToDisplay.forEach(itemToAdd => {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(itemToAdd.item));
        listItem.id = itemToAdd.id;
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