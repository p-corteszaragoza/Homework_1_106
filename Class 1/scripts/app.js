var index;
var counter;
var taskArrayStatus;

function taskStatus(clickedId) {
    console.log("Click on important icon");
    if(!taskArrayStatus[clickedId]) {      
        $("#task-status-"+clickedId).removeClass("far").addClass("fas");
        $("#txt-"+clickedId).css("text-decoration", "line-through");   
        taskArrayStatus[clickedId] = 1; 
        updateCounter(-1);
    } else { 
        $("#task-status-"+clickedId).removeClass("fas").addClass("far");
        $("#txt-"+clickedId).css("text-decoration", "none");   
        taskArrayStatus[clickedId] = 0;
        updateCounter(1);
    }
}

function updateCounter(value){
    counter = counter + value;
    if(counter < 0)
        counter = 0; 
    $("#taskCounter").html("");
    $("#taskCounter").append("Pending task: " + counter);   
}

function saveTodo(){
    // Read the text from the input field
    let text = $("#txtTodo").val();
    // Validations
    if(text.length == 0) {
        alert("Error: You must type something");
        return; // Get out of the function, do not continue
    } 
    let syntax =    `<ul id="card-${index}" class="card line">
                        <li id="task-${index}" class="task card-body">
                            <i id="task-status-${index}" class="far fa-check-circle" onclick='taskStatus(${index})'></i>
                            <h3 id="txt-${index}">`+ text +  `</h3>
                            <button class='btn btn-sm btn-danger' onclick='removeTask(${index})'>Delete</button>   
                        </li>
                     </ul>`;
    $("#todoContainer").append(syntax);
    counter++;
    index++;
    taskArrayStatus.push(0);
    // Clear the text
    $("#txtTodo").val('');
    $("#txtTodo").focus();
    $("#taskCounter").html("");
    $("#taskCounter").append("Pending task: " + counter);
    
}

function removeTask(clickedId){
    var element = document.getElementById("card-"+clickedId);
    if($("#task-status-"+clickedId).hasClass("far")){
        updateCounter(-1);
        this.taskArrayStatus.splice(clickedId, 1);
    }
    element.remove();  
}

function init() {
    console.log("Hello from todo app");
    // Load data
    counter = 0;
    index = 0;
    taskArrayStatus = [];
    // Hook events
    $("#btnSave").click(saveTodo);
    $("#txtTodo").keypress(function(args){
        if(args.key == "Enter"){
            console.log(args.key);
            saveTodo();
        }
    });

    $("#todoContainer").on('click', '.btn-danger', function(){
        console.log("Removing item" + index);
        //  $(this).remove();
    });
}

window.onload = init;