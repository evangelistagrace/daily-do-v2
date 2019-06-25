

function activateCheckbox(){
  // Checkboxes
  var checkboxes = Array.from(document.querySelectorAll('.checkbox'));
  var countChecked = 0;
  var totalCheckbox = checkboxes.length;
  var progressPercentage = 0;
  var progressBar = document.querySelector('.progress-bar');
  document.querySelector('span.percentage').innerHTML = progressPercentage + '%';
  document.querySelector('span.completed').innerHTML = countChecked;
  document.querySelector('span.total').innerHTML = totalCheckbox;

  //Add/remove ticks to checkboxes on click
  checkboxes.forEach((checkbox) => {
    var count = 0;
    checkbox.addEventListener('click', function(e){
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
      progressPercentage = Math.round(countChecked * (1/totalCheckbox) * 100);
      progressBar.style.width = progressPercentage + '%';
      document.querySelector('span.percentage').innerHTML = progressPercentage + '%';
      document.querySelector('span.completed').innerHTML = countChecked;
      document.querySelector('span.total').innerHTML = totalCheckbox;

    });
  });
}

 

//Insert task

document.querySelector('.btn-add-task').addEventListener('click', openPopUp); //open pop-up
document.querySelector('.btn-close').addEventListener('click', closePopUp); //close pop-up
document.getElementById('task-form').addEventListener('submit', addTask);

//read task form values
// const taskName = document.getElementById('task-name').value;
const dateline = new Date(document.getElementById('task-dateline').value);
const taskReminder = document.getElementById('task-reminder');
const toDoList = document.getElementById('to-do');

function openPopUp(){
  document.querySelector('.pop-up').style.display = 'block';
}

function closePopUp(){
  document.querySelector('.pop-up').style.display = 'none';
}

function addTask(e){
  e.preventDefault();
  //create new list item
  const li = document.createElement('li');
  if(taskReminder.checked == true){
    li.classList.add('important');
  }
  //create checkbox
  const cbox = document.createElement('input');
  cbox.className = 'checkbox';
  cbox.type = 'checkbox';
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

  taskDateline.innerHTML = 'Due: ' + dateline.getDate() + '/' + dateline.getMonth() + '/' + dateline.getFullYear();
  //create edit button
  const editBtn = document.createElement('i');
  editBtn.className = 'fas';
  editBtn.classList.add('fa-edit');
  //create delete button
  const delBtn = document.createElement('i');
  delBtn.className = 'fas';
  delBtn.classList.add('fa-trash-alt');

  //append list components
  li.appendChild(cbox);
  li.appendChild(pseudoCbox);
  li.appendChild(taskName);
  li.appendChild(taskDateline);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  //append new list item
  toDoList.appendChild(li);
  activateCheckbox(); //activate checkboxes
  document.getElementById('task-form').reset(); //reset form
}