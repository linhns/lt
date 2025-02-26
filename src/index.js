import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
	getDatabase,
	onValue,
	push,
	ref,
	remove,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {
	databaseURL: import.meta.env.VITE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++) {
		listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
	}
	ulEl.innerHTML = listItems;
}

onValue(referenceInDB, (snapshot) => {
	if (snapshot.exists()) {
		const snapshotValues = snapshot.val();
		const leads = Object.values(snapshotValues);
		render(leads);
	} else {
		render([]);
	}
});

deleteBtn.addEventListener("dblclick", () => {
	remove(referenceInDB);
});

inputBtn.addEventListener("click", () => {
	push(referenceInDB, inputEl.value);
	inputEl.value = "";
});
