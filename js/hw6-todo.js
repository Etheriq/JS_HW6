var ulList = document.getElementById('todo_ul_list');
var selectAll = document.getElementById('select_all_chk');
var  summaryResult = document.getElementById('summary_chk');
document.getElementById('todo_text_field').addEventListener('keypress', function(e) {
    if (e.keyCode === 13 && e.target.value) {
        var chkBox = document.createElement('input');
        var li = document.createElement('li');
        var span = document.createElement('span');

        chkBox.type = 'checkbox';
        chkBox.classList.add('chk-li');
        chkBox.addEventListener('change', function(e){
            var selLi = e.target;
            if (selLi.checked) {
                selLi.parentNode.classList.add('selected-li');
            } else {
                selLi.parentNode.classList.remove('selected-li');
            }
            showSelectedUnselected(ulList);
        });
        span.addEventListener('click', function(e){
            var inputText = document.createElement('input');
            var span = e.target;
            inputText.addEventListener('keypress', function(e){
                if (e.keyCode == 13 && e.target.value) {
                    span.textContent = e.target.value;
                    span.parentNode.removeChild(e.target);
                    span.classList.remove('no-display');
                }
            });
            inputText.type = 'text';
            inputText.classList.add('input-f');
            inputText.value = e.target.textContent;
            span.classList.add('no-display');
            span.parentNode.appendChild(inputText);

        });
        li.appendChild(chkBox);
        span.innerHTML = e.target.value;
        li.appendChild(span);
        //li.contentEditable = true;
        e.target.value = '';
        ulList.appendChild(li);
        showSelectedUnselected(ulList);
    }
});

function showSelectedUnselected(ul)
{
    var totalLi = ul.querySelectorAll('li');
    var selectedLi = ul.querySelectorAll('li.selected-li');

    summaryResult.innerText = 'Selected: ' + selectedLi.length + ' Total: ' + totalLi.length;
}

selectAll.addEventListener('change', function(e){
    var li = ulList.querySelectorAll('li');
    if (e.target.checked) {
        li.forEach(function(el){
            el.classList.add('selected-li');
            el.children[0].checked = true;
        });
    } else {
        li.forEach(function(el){
            el.classList.remove('selected-li');
            el.children[0].checked = false;
        });
    }
    showSelectedUnselected(ulList);
});

document.getElementById('delete_selected_li').addEventListener('click', function(){
    var selectedLi = ulList.querySelectorAll('li.selected-li');

    selectedLi.forEach(function(el){
        el.remove();
    });

    selectAll.checked = false;
    showSelectedUnselected(ulList);
});

NodeList.prototype.forEach = function (f) {
    Array.prototype.forEach.call(this, f);
};