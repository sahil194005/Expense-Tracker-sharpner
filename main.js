let button = document.querySelector("#submit")
let amount = document.querySelector("#amount_input")
let description = document.querySelector("#description_input")
let category = document.querySelector("#category_input")
let form_area = document.querySelector("#form")

button.addEventListener("click", pressed)

function pressed(e) {

    if(amount.value==''||description.value==""||category.value==""){
        alert('fill all the details please')
    }
  e.preventDefault()
  let obj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  }
  let existingData = localStorage.getItem("arr")

  if (existingData) {
    let existingData_json = JSON.parse(existingData)
    let newArray = []
    for (let i = 0; i < existingData_json.length; i++) {
      newArray.push(existingData_json[i])
    }

    newArray.push(obj)
    let newArray_string = JSON.stringify(newArray)
    localStorage.setItem("arr", newArray_string)
  } else {
    let newArray = []
    newArray.push(obj)
    let obj_string = JSON.stringify(newArray)
    localStorage.setItem("arr", obj_string)
  }
  amount.value = ""
  description.value = ""
  category.value = ""

  generating_form()
}

function generating_form() {
  let oldlis = document.querySelector("ul")
  if (oldlis) {
    oldlis.remove()
  }

  let newList = document.createElement("ul")

  let existingData_json = JSON.parse(localStorage.getItem("arr"))

  for (let i = 0; i < existingData_json.length; i++) {

    let new_item = document.createElement("li")

    let delete_exp_btn = document.createElement("button")
    let edit_exp_btn = document.createElement("button")
    // delete_exp_btn.id = "delete_exp_btn_id"
    // edit_exp_btn.id = "edit_exp_btn_id"
    edit_exp_btn.classList = "btn btn-secondary"

    delete_exp_btn.textContent = "Delete Expense"
    delete_exp_btn.classList = "btn btn-danger"
    edit_exp_btn.textContent = "Edit Expense"

    let description_span = document.createElement("span")
    description_span.textContent = existingData_json[i].description
    description_span.style.display = "none"

    let amount_span = document.createElement("span")
    amount_span.textContent = existingData_json[i].amount
    amount_span.style.display = "none"

    let category_span = document.createElement("span")
    category_span.textContent = existingData_json[i].category
    category_span.style.display = "none"

    new_item.appendChild(
      document.createTextNode(
        `${existingData_json[i].amount} - ${existingData_json[i].description} - ${existingData_json[i].category}`
      )
    )

    new_item.appendChild(description_span)
    new_item.appendChild(amount_span)
    new_item.appendChild(category_span)

    new_item.appendChild(delete_exp_btn)
    new_item.appendChild(edit_exp_btn)
    newList.appendChild(new_item)

    delete_exp_btn.addEventListener("click", delete_expenses)
    edit_exp_btn.addEventListener("click", edit_expenses)
  }
  form_area.appendChild(newList)
}

function edit_expenses(e) {
  let tobedeleted = e.target.parentNode
  tobedeleted.remove()

  let disc = tobedeleted.firstElementChild.textContent
  let amounti = tobedeleted.firstElementChild.nextElementSibling.textContent
  let cati =
    tobedeleted.firstElementChild.nextElementSibling.nextElementSibling
      .textContent
  amount.value = amounti
  description.value = disc
  category.value = cati

  let existingData_json = JSON.parse(localStorage.getItem("arr"))
  let updated_data = existingData_json.filter(
    (item) => item.description != disc
  )
  localStorage.setItem("arr", JSON.stringify(updated_data))
}

function delete_expenses(e) {
  let tobedeleted = e.target.parentNode
  tobedeleted.remove()

  let disc = tobedeleted.firstElementChild.textContent
  let amounti = tobedeleted.firstElementChild.nextElementSibling.textContent
  let cati =
    tobedeleted.firstElementChild.nextElementSibling.nextElementSibling
      .textContent

  let existingData_json = JSON.parse(localStorage.getItem("arr"))
  let updated_data = existingData_json.filter(
    (item) => item.description != disc
  )
  localStorage.setItem("arr", JSON.stringify(updated_data))
}
