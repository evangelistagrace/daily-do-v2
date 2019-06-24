var count = 0;

var checkbox = document.querySelector('.checkbox');
var pseudoCheckbox = document.querySelector('.pseudo-checkbox');

checkbox.addEventListener('click', check);

function check(e){
  if(e.target.checked == true && count == 0 ){
    var check = document.createElement('i');
    check.className = 'fas';
    check.classList.add('fa-check');
    pseudoCheckbox.appendChild(check);
    count = 1;
  }else{
    var checked = e.target.nextSibling.firstChild;
    checked.parentNode.removeChild(checked);
    count = 0;
  }
}