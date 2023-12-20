import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-6hbV69tC2QLhJhyy98KM0y2QCsRu-IU",
  authDomain: "logform-d296a.firebaseapp.com",
  databaseURL: "https://logform-d296a-default-rtdb.firebaseio.com",
  projectId: "logform-d296a",
  storageBucket: "logform-d296a.appspot.com",
  messagingSenderId: "455249423966",
  appId: "1:455249423966:web:b67034b8c55430f1e1cecf",
  measurementId: "G-6H8TCVCS1B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const reservationsRef = ref(database, "LOGFORM/reservations");

// Function to render reservations in the table
function renderReservations(reservations) {
  const reservationTableBody = document.getElementById("reservationTableBody");
  reservationTableBody.innerHTML = "";

  for (const key in reservations) {
    const reservation = reservations[key];
    const row = document.createElement("tr");

    // Cells for reservation data
    const cells = ["name", "email", "date", "time", "pack"];
    cells.forEach((cell) => {
      const cellElement = document.createElement("td");
      cellElement.textContent = reservation[cell];
      row.appendChild(cellElement);
    });

    // Delete button cell
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => {
      deleteReservation(key);
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    reservationTableBody.appendChild(row);
  }
}

// Firebase event listener for changes in reservations
onValue(reservationsRef, (snapshot) => {
  const reservations = snapshot.val();
  renderReservations(reservations);
});

// Function to delete a reservation
function deleteReservation(key) {
  remove(ref(database, `LOGFORM/reservations/${key}`));
}

// Additional code for sorting by date
document.getElementById("sortDate").addEventListener("click", () => {
  sortReservationsByDate();
});

// Function to sort reservations by date
function sortReservationsByDate() {
  const reservationTableBody = document.getElementById("reservationTableBody");
  const rows = Array.from(reservationTableBody.children);
  const sortedRows = rows.sort((a, b) => {
    const dateA = new Date(a.cells[2].textContent);
    const dateB = new Date(b.cells[2].textContent);
    return dateA - dateB;
  });

  // Append sorted rows to the table body
  reservationTableBody.innerHTML = "";
  sortedRows.forEach((row) => {
    reservationTableBody.appendChild(row);
  });
}
