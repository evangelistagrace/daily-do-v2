var checkboxes = Array.from(document.querySelectorAll('.checkbox'));
var countChecked = 0; //global variable
var totalCheckbox = 0; //global variable
const progressBar = document.querySelector('.progress-bar');
const progressPercentage =  document.querySelector('span.percentage');
const completed = document.querySelector('span.completed');
completed.innerHTML = 0;
const total = document.querySelector('span.total');
var tasks = Array.from(document.querySelectorAll('.list-item'));
const delBtns =  Array.from(document.querySelectorAll('.fa-trash-alt'));
const editBtns =  Array.from(document.querySelectorAll('.fa-edit'));


function activateChecbox(e){
  var count = 0;
  if(e.target.checked == true && count == 0){
    //select pseudo checkbox
    var pseudoCheck  = e.target.nextElementSibling;
    //create tick
    var tick = document.createElement('i');
    tick.className = 'fas';
    tick.classList.add('fa-check');
    pseudoCheck.appendChild(tick);
    countChecked++;
    count = 1;
  }else{ //untick
    var pseudoChecked = e.target.nextElementSibling.firstChild;
    pseudoChecked.parentNode.removeChild(pseudoChecked);
    countChecked--;      
    count = 0;
  } 
  //update progress when checkboxes are ticked/unticked
  progressPercentage.innerHTML = Math.round(countChecked * (1/totalCheckbox) * 100) + '%';
  progressBar.style.width = Math.round(countChecked * (1/totalCheckbox) * 100) + '%';
  completed.innerHTML = countChecked;
}

function updateProgress(){ //called everytime task is added/deleted
  totalCheckbox = checkboxes.length; 
  total.innerHTML = totalCheckbox;
  progressPercentage.innerHTML = Math.round(countChecked * (1/totalCheckbox) * 100) + '%';
  progressBar.style.width = Math.round(countChecked * (1/totalCheckbox) * 100) + '%';
  completed.innerHTML = countChecked;
  checkboxes.forEach( checkbox => {checkbox.addEventListener('click', activateChecbox)});
  delBtns.forEach( delBtn => {delBtn.addEventListener('click', deleteTask)});
  editBtns.forEach( editBtn => {editBtn.addEventListener('click', editTaskPopUp)});
}

document.querySelector('.btn-add-task').addEventListener('click', newTaskPopUp); //open pop-up
document.querySelector('.btn-close').addEventListener('click', closePopUp); //close pop-up


function closePopUp(){
  document.querySelector('.pop-up').style.display = 'none';
}

//ADD TASK
function newTaskPopUp(){
  var form = document.getElementById('task-form');
  var formTitle =  document.querySelector('.pop-up-title');
  var addBtn = document.getElementById('add-task-btn');
  formTitle.innerHTML = 'Add Task';
  addBtn.innerHTML = 'Add';
  form.addEventListener('submit', addTask);
  document.querySelector('.pop-up').style.display = 'block';
}

function addTask(e){
  const toDoList = document.getElementById('to-do');
  const taskReminder = document.getElementById('task-reminder');

  e.preventDefault();
  //create new list item
  const task = document.createElement('li');
  task.className = 'list-item';
  if(taskReminder.checked == true){
    task.classList.add('important');
  }
  //create checkbox
  const cbox = document.createElement('input');
  cbox.className = 'checkbox';
  cbox.type = 'checkbox';
  checkboxes.push(cbox);
  //create pseudo-checkbox
  const pseudoCbox = document.createElement('div');
  pseudoCbox.className = 'pseudo-checkbox';
  //create task name
  const taskName = document.createElement('div');
  taskName.className = 'task';
  taskName.innerHTML = document.getElementById('task-name').value;
  //create task dateline
  const taskDateline = document.createElement('span');
  taskDateline.className = 'dateline';
  // console.log(dateline);
  taskDateline.innerHTML = 'Due: ' + document.getElementById('task-dateline').value;
  //create edit button
  const editBtn = document.createElement('i');
  editBtn.className = 'fas';
  editBtn.classList.add('fa-edit');
  editBtns.push(editBtn);
  //create delete button
  const delBtn = document.createElement('i');
  delBtn.className = 'fas';
  delBtn.classList.add('fa-trash-alt');
  delBtns.push(delBtn);
  //append list components
  task.appendChild(cbox);
  task.appendChild(pseudoCbox);
  task.appendChild(taskName);
  task.appendChild(taskDateline);
  task.appendChild(editBtn);
  task.appendChild(delBtn);

  tasks.push(task);
  //append new list item
  toDoList.appendChild(task);
  //reset form
  document.getElementById('task-form').reset(); 
  totalCheckbox++;
  updateProgress();
  
}

//EDIT TASK
function editTaskPopUp(e){
  var form = document.getElementById('task-form');
  var formTitle =  document.querySelector('.pop-up-title');
  var saveBtn = document.getElementById('add-task-btn');
  e.target.parentNode.classList.add('current');
  var task = document.querySelector('.current');
  var taskName = task.querySelector('.task');
  var taskDateline = task.querySelector('.dateline');
  var taskDatelineValue =  new Date(taskDateline.innerHTML.substr(5));
  

  //form data
  var formName = document.getElementById('task-name');
  var formDateline = document.getElementById('task-dateline');
  var formReminder = document.getElementById('task-reminder');

  formTitle.innerHTML = 'Edit Task';
  saveBtn.innerHTML = 'Edit';
  form.removeEventListener('submit', addTask);
  form.addEventListener('submit', submitEditTask);
  document.querySelector('.btn-close').removeEventListener('click', closePopUp);
  document.querySelector('.btn-close').addEventListener('click', submitEditTask);


  formName.value = taskName.innerHTML;
  formDateline.valueAsDate = taskDatelineValue;
  if(task.classList.contains('important')){
    formReminder.checked = true;
  };

  document.querySelector('.pop-up').style.display = 'block';

  function submitEditTask(e){
    e.preventDefault();
    taskName.innerHTML = formName.value;
    taskDateline.innerHTML = 'Due: ' + formDateline.value;
    if(formReminder.checked == true){
      if(task.classList.contains('important')){
        //do nothing
      }else{
        task.classList.add('important');
      }
    }else{
      if(task.classList.contains('important')){
        task.classList.remove('important');
      }
    }
    //reset form
    document.getElementById('task-form').reset(); 
    form.removeEventListener('submit', submitEditTask);
    document.querySelector('.btn-close').removeEventListener('click', submitEditTask);
  document.querySelector('.btn-close').addEventListener('click', closePopUp);

    task.classList.remove('current'); 
    closePopUp();
  }
}


//DELETE TASK
function deleteTask(){
  var btn_index = delBtns.indexOf(this);
  var task_index = tasks.indexOf(tasks[btn_index]);

  this.parentNode.parentNode.removeChild(tasks[task_index]);
  delBtns.splice(btn_index, 1);
  tasks.splice(task_index, 1);
  if(checkboxes[task_index].checked == true){
    countChecked--;
  }
  checkboxes.splice(task_index, 1);
  totalCheckbox--;
  updateProgress();
}
