// 24 time slots (every hour)
const times = [
  "12:00 AM","1:00 AM","2:00 AM","3:00 AM","4:00 AM","5:00 AM",
  "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM"
];

const plannerBody = document.getElementById("plannerBody");

// Load table rows
function loadPlanner() {
  if (!plannerBody) return;
  plannerBody.innerHTML = "";
  times.forEach(time => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${time}</td>
      <td><input type="text" class="todo"></td>
      <td><input type="text" class="note"></td>
      <td>
        <select class="completed">
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </td>
      <td><input type="text" class="feedback" placeholder="Good / Need Improve"></td>
    `;
    plannerBody.appendChild(row);
  });
}

// Save
if (document.getElementById("saveBtn")) {
  document.getElementById("saveBtn").addEventListener("click", () => {
    let data = [];
    document.querySelectorAll("#plannerBody tr").forEach(row => {
      let obj = {
        time: row.cells[0].innerText,
        todo: row.querySelector(".todo").value,
        note: row.querySelector(".note").value,
        completed: row.querySelector(".completed").value,
        feedback: row.querySelector(".feedback").value
      };
      data.push(obj);
    });
    localStorage.setItem("plannerData", JSON.stringify(data));
    alert("✅ Planner Saved!");
  });
}

// Reset
if (document.getElementById("resetBtn")) {
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem("plannerData");
    loadPlanner();
  });
}

// Mark all completed
if (document.getElementById("markAllBtn")) {
  document.getElementById("markAllBtn").addEventListener("click", () => {
    document.querySelectorAll(".completed").forEach(select => {
      select.value = "Yes";
    });
  });
}

// PDF (future feature)
if (document.getElementById("pdfBtn")) {
  document.getElementById("pdfBtn").addEventListener("click", () => {
    alert("⚡ PDF export can be added with jsPDF.");
  });
}

// Load saved data + user
window.onload = () => {
  if (document.getElementById("userName")) {
    document.getElementById("userName").innerText = localStorage.getItem("plannerUser") || "Student";
  }
  loadPlanner();
  let data = JSON.parse(localStorage.getItem("plannerData"));
  if (data) {
    document.querySelectorAll("#plannerBody tr").forEach((row, i) => {
      row.querySelector(".todo").value = data[i].todo;
      row.querySelector(".note").value = data[i].note;
      row.querySelector(".completed").value = data[i].completed;
      row.querySelector(".feedback").value = data[i].feedback;
    });
  }
};