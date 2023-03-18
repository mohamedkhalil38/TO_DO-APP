const addBtn = document.querySelectorAll("#add-btn");
let tasks = 0;

function addTask(e) {
  tasks++;
  const boxTemp =
    ' <div class="box" draggable="true"><input id="text" type="text" placeholder="Enter your task"/><ion-icon id="edit" name="create-outline"></ion-icon><ion-icon id="delete" name="trash-outline"></ion-icon></div>';
  e.target.parentNode.firstElementChild.insertAdjacentHTML("afterend", boxTemp);
  const boxes = document.querySelectorAll(".box");

  let boxesContainer = [];

  boxes.forEach((box, index) => {
    boxEl = {
      value: box.querySelector("input").value,
      parentNode: box.parentNode.classList.value,
      index: index,
    };

    boxesContainer.push(boxEl);

    box.addEventListener("dragstart", () => {
      box.classList.add("dragging");
    });

    box.addEventListener("dragend", () => {
      box.classList.remove("dragging");
    });

    box.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingBox = document.querySelector(".dragging");
      const boundingRect = box.getBoundingClientRect();

      const offset = boundingRect.y + boundingRect.height / 2 - e.clientY;
      if (offset < 0 && draggingBox.nextSibling !== box) {
        box.parentNode.insertBefore(draggingBox, box.nextSibling);
      } else if (offset > 0 && draggingBox.previousSibling !== box) {
        box.parentNode.insertBefore(draggingBox, box);
      }
    });

    box.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggingBox = document.querySelector(".dragging");
      const boundingRect = box.getBoundingClientRect();
      const offset = boundingRect.y + boundingRect.height / 2 - e.clientY;
      if (offset < 0 && draggingBox.nextSibling !== box) {
        box.parentNode.insertBefore(draggingBox, box.nextSibling);
      } else if (offset > 0 && draggingBox.previousSibling !== box) {
        box.parentNode.insertBefore(draggingBox, box);
      }
    });

    const edit = box.querySelector("#edit");
    const dlt = box.querySelector("#delete");

    dlt.addEventListener("click", () => {
      box.parentNode.removeChild(box);
    });

    edit.addEventListener("click", () => {
      box.querySelector("input").removeAttribute("readonly");
    });
  });

  const ns = [];
  const ip = [];
  const cm = [];
  boxesContainer.forEach((box) => {
    if (box.parentNode === "not-started") {
      ns.push(box);
    } else if (box.parentNode === "in-progress mbox") {
      ip.push(box);
    } else {
      cm.push(box);
    }
    window.localStorage.setItem("notStarted", JSON.stringify(ns));
    window.localStorage.setItem("inProgress", JSON.stringify(ip));
    window.localStorage.setItem("completed", JSON.stringify(cm));
  });

  if (tasks > 1) {
    boxes.forEach((box, index) => {
      if (index > 0) {
        box.querySelector("input").setAttribute("readonly", true);
      }
    });
  }
}

function localStorg(clas, item) {
  const container = document.querySelector(`.${clas}`);
  const boxTemp = ` <div class="box" draggable="true"><input value="${item.value}" id="text" type="text" placeholder="Enter your task"/><ion-icon id="edit" name="create-outline"></ion-icon><ion-icon id="delete" name="trash-outline"></ion-icon></div>`;
  container.firstElementChild.insertAdjacentHTML("afterend", boxTemp);
}

window.addEventListener("load", () => {
  JSON.parse(window.localStorage.getItem("notStarted")).forEach((item) => {
    localStorg("not-started", item);
  });
  JSON.parse(window.localStorage.getItem("inProgress")).forEach((item) => {
    localStorg("in-progress", item);
  });
  JSON.parse(window.localStorage.getItem("completed")).forEach((item) => {
    localStorg("completed", item);
  });
});

addBtn.forEach((btn) => {
  btn.addEventListener("click", addTask);
});
