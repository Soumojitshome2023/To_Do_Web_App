
var elem = document.documentElement;
elem.requestFullscreen();



load();
document.getElementById("modal").style.display = "none";

var last_plce = 0;


// ===================================Submit Button Hide===================================

document.getElementById("inpt_task_area").addEventListener("input", () => {

    if (document.getElementById("inpt_task_area").value.trim() == "") {
        document.getElementById("task_add_btn").style.display = "none";

    }
    else {
        document.getElementById("task_add_btn").style.display = "inline-block";
    }

})

// ========================================================================================




// ===================================Stay Last Location===================================

function stay_last_plce() {

    if (last_plce == 1) {
        star_task();
    }
    else if (last_plce == 2) {
        pending_task();
    }
    else if (last_plce == 3) {
        completed_task();
    }
}


// ========================================================================================





// ========================================Task Add========================================

function task_add() {

    let task = document.getElementById("inpt_task_area").value;

    if (localStorage.getItem("todos") == null) {

        let obj = [];

        obj.push([task, 0, 0]);

        // task , pending or completed , not imp or star

        localStorage.setItem("todos", JSON.stringify(obj));

    }
    else {
        let obj = JSON.parse(localStorage.getItem("todos"));

        obj.push([task, 0, 0]);

        localStorage.setItem("todos", JSON.stringify(obj));

    }

    document.getElementById("inpt_task_area").value = "";

    load();


}

// ======================================================================================== 





// ========================================Task Load=======================================
function load() {
    document.getElementById("task_add_btn").style.display = "none";
    document.getElementById("pending_task").style.boxShadow = "0 0 7px 4px yellow";
    document.getElementById("completed_task").style.boxShadow = "";
    document.getElementById("star_task").style.boxShadow = "";

    let todos = document.getElementsByClassName("todos")[0];
    todos.innerHTML = "";


    if (localStorage.getItem("todos") != null) {

        let obj = JSON.parse(localStorage.getItem("todos"));

        obj.forEach((ele, ind) => {

            let b = `
                <div class="todo">
                
                <div class="done_symbol" onclick="task_done(${ind})"><span><i class="fa fa-check"></i></span></div>
                <p>${obj[ind][0]}</p>

                <button class="todo_star_btn" onclick="todo_star_btn(${ind})"><i class='far fa-star star'></i></button>
                
                <button class="todo_edit_btn" onclick="todo_edit_btn(${ind})"><i class='fas fa-edit'></i></button>
                
                <button class="todo_delete_btn" onclick="delete_btn(${ind})"><i class='fas fa-trash-alt'></i></button>

                </div>

                `

            todos.innerHTML += b;

            if (obj[ind][1] == '1') {

                document.querySelectorAll(".done_symbol span")[ind].style.display = "block";
                document.querySelectorAll(".todo p")[ind].style.textDecoration = "line-through";
                document.querySelectorAll(".todo")[ind].style.display = "none";
                document.querySelectorAll(".todo")[ind].style.backgroundColor = "#41753b";
            }

            if (obj[ind][2] == '1') {

                document.querySelectorAll(".star")[ind].classList.toggle("far");
                document.querySelectorAll(".star")[ind].classList.toggle("fas");
            }


        });

    }

    stay_last_plce();

}
// ========================================================================================




// ====================================Task Done/Toggle====================================
function task_done(ind) {

    let obj = JSON.parse(localStorage.getItem("todos"));


    // if (document.querySelectorAll(".done_symbol span")[ind].style.display == "") {
    if (obj[ind][1] == '0') {

        obj[ind][1] = 1;

        localStorage.setItem("todos", JSON.stringify(obj));

    }
    else {

        obj[ind][1] = 0;

        localStorage.setItem("todos", JSON.stringify(obj));

    }

    load();

}
// ========================================================================================





// =======================================Task Delete======================================

let tmp;

function delete_btn(ind) {

    // console.log("1 : " + ind)

    let obj = JSON.parse(localStorage.getItem("todos"));

    document.getElementById("modal").style.display = "";
    document.getElementById("task_name_on_modal").innerHTML = `${obj[ind][0]}`

    tmp = ind;

}

document.getElementsByClassName("modal_btn")[0].addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";

    let obj = JSON.parse(localStorage.getItem("todos"));


    // console.log("2 : " + tmp)

    obj.splice(tmp, 1);

    localStorage.setItem("todos", JSON.stringify(obj));

    load();

})


document.getElementsByClassName("modal_btn")[1].addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";


})




// ========================================================================================




// ========================================Star Task=======================================


function star_task() {


    document.getElementById("star_task").style.boxShadow = "0 0 7px 4px yellow";
    document.getElementById("pending_task").style.boxShadow = "";
    document.getElementById("completed_task").style.boxShadow = "";

    let obj = JSON.parse(localStorage.getItem("todos"));

    obj.forEach((ele, ind) => {

        document.querySelectorAll(".todo")[ind].style.display = "none";

        if (obj[ind][2] == '1') {

            document.querySelectorAll(".todo")[ind].style.display = "";
        }



    })

    last_plce = 1;

}

// ========================================================================================





// ======================================Pending Task======================================

function pending_task() {

    document.getElementById("star_task").style.boxShadow = "";
    document.getElementById("pending_task").style.boxShadow = "0 0 7px 4px yellow";
    document.getElementById("completed_task").style.boxShadow = "";

    let obj = JSON.parse(localStorage.getItem("todos"));

    obj.forEach((ele, ind) => {

        document.querySelectorAll(".todo")[ind].style.display = "none";

        // if (document.querySelectorAll(".todo p")[ind].style.textDecoration != "line-through") {
        if (obj[ind][1] == '0') {


            document.querySelectorAll(".todo")[ind].style.display = "";
        }

    })

    last_plce = 2;

}

// ========================================================================================




// =====================================Completed Task=====================================

function completed_task() {


    document.getElementById("star_task").style.boxShadow = "";
    document.getElementById("pending_task").style.boxShadow = "";
    document.getElementById("completed_task").style.boxShadow = "0 0 7px 4px yellow";

    let obj = JSON.parse(localStorage.getItem("todos"));

    obj.forEach((ele, ind) => {

        document.querySelectorAll(".todo")[ind].style.display = "none";


        // if (document.querySelectorAll(".todo p")[ind].style.textDecoration == "line-through") {
        if (obj[ind][1] == '1') {

            document.querySelectorAll(".todo")[ind].style.display = "";
        }

    })

    last_plce = 3;

}

// ========================================================================================


// =======================================To-Do Edit=======================================

function todo_edit_btn(ind) {

    load();

    let obj = JSON.parse(localStorage.getItem("todos"));

    document.querySelectorAll(".todo_star_btn")[ind].style.display = "none";
    document.querySelectorAll(".todo_edit_btn")[ind].style.display = "none";
    document.querySelectorAll(".todo_delete_btn")[ind].style.display = "none";

    document.querySelectorAll(".todo")[ind].innerHTML += `
        <i class="fas fa-save" onclick="edit_save(${ind})"></i>
    
        `

    let temp = document.querySelectorAll(".todo p")[ind]

    temp.innerHTML = `
        <input type="text" class="edit_todo" maxlength="100" value = "${obj[ind][0]}" >
        
        `

}


function edit_save(ind) {

    let obj = JSON.parse(localStorage.getItem("todos"));

    let val = document.querySelectorAll(".edit_todo")[0].value

    obj[ind][0] = val;

    localStorage.setItem("todos", JSON.stringify(obj));

    load();
    // stay_last_plce();


}

// ========================================================================================






// ===================================== To-Do Star Btn====================================


function todo_star_btn(ind) {

    let obj = JSON.parse(localStorage.getItem("todos"));

    document.querySelectorAll(".star")[ind].classList.toggle("far");
    document.querySelectorAll(".star")[ind].classList.toggle("fas");

    if (obj[ind][2] == '0') {

        obj[ind][2] = 1;
        localStorage.setItem("todos", JSON.stringify(obj));
    }
    else {

        obj[ind][2] = 0;
        localStorage.setItem("todos", JSON.stringify(obj));
    }


    load();



}




// ========================================================================================




