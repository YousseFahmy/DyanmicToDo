const pendingList = [];
const completedList = [];

const pendingListUl = document.getElementById("pendingList");
const completedListUl = document.getElementById("completedList");
const addButton = document.getElementById("addItemButton");
const inputField = document.getElementById("addItemInput");
const searchField = document.getElementById("searchBar");

addButton.addEventListener("click", (event) => {
    event.preventDefault();

    let newItem = inputField.value;
    addPending(newItem);
    inputField.value = "";
});

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("change", (event) => {
    event.preventDefault();
    const searchValue = searchField.value;
    const filteredList = pendingList.filter(item => item.includes(searchValue));
    console.log(filteredList);
    redisplayPending(filteredList);
});

const completeItem = listItem => {
    pendingListUl.removeChild(listItem);
    completedListUl.appendChild(listItem);
};


const addPending = function (itemToAdd) {
    if (itemToAdd == "") return;
    pendingList.push(itemToAdd);
    redisplayPending(pendingList);
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