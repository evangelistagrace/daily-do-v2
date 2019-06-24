var checkboxes = Array.from(document.querySelectorAll('.checkbox'));
var countChecked = 0;
var totalCheckbox = checkboxes.length;
var progressPercentage = 0;
var progressBar = document.querySelector('.progress-bar');


//Add/remove ticks to checkboxes on click
checkboxes.forEach((checkbox) => {
  var count = 0;
  checkbox.addEventListener('click', function(e){
    if(e.target.checked == true && count == 0){
      //select pseudo checkbox
      var pseudoCheck  = e.target.nextSibling;
      //create tick
      var tick = document.createElement('i');
      tick.className = 'fas';
      tick.classList.add('fa-check');
      pseudoCheck.appendChild(tick);
      countChecked++;
      count = 1;
    }else{ //untick
      var pseudoChecked = e.target.nextSibling.firstChild;
      pseudoChecked.parentNode.removeChild(pseudoChecked);
      countChecked--;      
      count = 0;
    } 
    progressPercentage = countChecked * (1/totalCheckbox) * 100;
    // console.log(progressPercentage);
    progressBar.style.width = progressPercentage + '%';
    document.querySelector('span.percentage').innerHTML = progressPercentage + '%';
  });
});
 

// 
// console.log(totalCheckbox);

