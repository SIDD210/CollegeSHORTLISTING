import cData from "./data.js";

const income = document.getElementById("income");
const percentage = document.getElementById("Percentage");
const btn = document.getElementById("submitbutton");

let collegeName = "";
let annualIncome = 0;
let categoryName = "";
let marks = 0;

// populating dropdown lists with JSON data
cData.forEach((college) => {
  let o = document.createElement("option");
  o.text = college.COLLEGE_NAME;
  o.value = college.COLLEGE_NAME;
  colleges.appendChild(o);
});

function removedup_colleges() {
  var mycode = {};
  $("select[id='colleges'] > option").each(function () {
    if (mycode[this.text]) {
      $(this).remove();
    } else {
      mycode[this.text] = this.value;
    }
  });
}

cData.forEach((category) => {
  let o = document.createElement("option");
  o.text = category.CASTE;
  o.value = category.CASTE;
  categories.appendChild(o);
});

function removedup_category() {
  var mycode = {};
  $("select[id='categories'] > option").each(function () {
    if (mycode[this.text]) {
      $(this).remove();
    } else {
      mycode[this.text] = this.value;
    }
  });
}

document
  .getElementById("colleges")
  .addEventListener("click", removedup_colleges, false);

document
  .getElementById("categories")
  .addEventListener("click", removedup_category, false);

// functions for checking numeric status
function isNumeric() {
  var ans = !isNaN(parseFloat(this.value)) && isFinite(this.value);
  if (!ans) {
    var tag = document.createElement("p");
    var text = document.createTextNode("(Please enter a numeric value)");
    tag.appendChild(text);
    var element = document.getElementById("p1");
    element.appendChild(tag);
  }
}

function isNumeric2() {
  var ans = !isNaN(parseFloat(this.value)) && isFinite(this.value);
  if (!ans) {
    var tag = document.createElement("p");
    var text = document.createTextNode("(Please enter a numeric value)");
    tag.appendChild(text);
    var element = document.getElementById("p2");
    element.appendChild(tag);
  }
}

// checking_numeric_status
income.addEventListener("change", isNumeric);

percentage.addEventListener("change", isNumeric2);

// enabling_submit_btn
document.onkeyup = (e) => {
  if (e.target.tagName === "INPUT") {
    const canSubmit = [
      ...document.forms.theform.querySelectorAll('input[type="text"]'),
    ].every((i) => {
      return i.value;
    });
    document.forms.theform.querySelector('input[type="submit"]').disabled =
      !canSubmit;
  }
};

//after clicking submit btn
function anotherPage() {
  collegeName = document.getElementById("colleges").value;
  annualIncome = Number(document.getElementById("income").value);
  categoryName = document.getElementById("categories").value;
  marks = Number(document.getElementById("Percentage").value);

  document.getElementById("container").innerHTML = `
  <!-- title -->
  <div id="title">
  </div>
  <br><br><br><br>
  <!-- table area -->
  <div id="tab"></div>
  `;

  let headers = [
    "COLLEGE_NAME",
    "ANNUAL_FEE",
    "CASTE",
    "COURSE",
    "SCHOLARSHIP_AMOUNT",
    "SCHOLARSHIP_MARKS",
  ];

  let count = 0;
  let flag = true;
  let table = document.createElement("table");
  cData.forEach((record) => {
    if (
      //if fees and marks both are high
      record.ANNUAL_FEE < 0.6 * annualIncome &&
      collegeName == record.COLLEGE_NAME &&
      categoryName == record.CASTE
    ) {
      if (flag) {
        document.getElementById(
          "title"
        ).innerHTML = `<h1>Congratulations! These are the courses available for you</h1>`;
        let headerRow = document.createElement("tr");
        headers.forEach((headerText) => {
          let header = document.createElement("th");
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
      }
      let row = document.createElement("tr");
      Object.values(record).forEach((text) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
      });
      table.appendChild(row);
      count += 1;
      flag = false;
    } else {
      if (
        marks >= record.SCHOLARSHIP_MARKS &&
        collegeName == record.COLLEGE_NAME &&
        categoryName == record.CASTE
      ) {
        if (flag) {
          //if fees is low but marks are high
          document.getElementById(
            "title"
          ).innerHTML = `<h1>Congratulations! These are the courses available for you</h1>`;
          let headerRow = document.createElement("tr");
          headers.forEach((headerText) => {
            let header = document.createElement("th");
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
          });
          table.appendChild(headerRow);
        }
        let row = document.createElement("tr");
        Object.values(record).forEach((text) => {
          let cell = document.createElement("td");
          let textNode = document.createTextNode(text);
          cell.appendChild(textNode);
          row.appendChild(cell);
        });
        table.appendChild(row);
        count += 1;
        flag = false;
      }
    }
  });
  document.getElementById("tab").appendChild(table);

  //if fees is low and marks is low
  if (count == 0) {
    document.getElementById(
      "title"
    ).innerHTML = `<h1>Sorry ! No courses are available for you!</h1>`;
  }
}

//event listener for submit btn
btn.addEventListener("click", anotherPage);
