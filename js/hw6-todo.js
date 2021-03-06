var ulList = document.getElementById('todo_ul_list');
var selectAll = document.getElementById('select_all_chk');
var summaryResult = document.getElementById('summary_chk');
var filter = document.getElementById('tod_filter');
var input = document.getElementById('todo_text_field');

function handleDragStart(e) {

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('Text', e.target.getAttribute('id'));

    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    var data = e.dataTransfer.getData('Text');
    e.target.appendChild(document.getElementById(data));

    return false;
}

function handleDragEnd(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    var li = ulList.querySelectorAll('li');

    li.forEach(function (li) {
        li.classList.remove('over');
    });

    return false;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13 && e.target.value && filter.checked === false) {
        var li = document.createElement('li');
        var chkBox = document.createElement('input');
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
                inputText.addEventListener('keyup', function(e){
                    if (e.keyCode == 13 && e.target.value) {
                        span.textContent = e.target.value;
                        span.parentNode.removeChild(e.target);
                        span.classList.remove('no-display');
                    }
                });
                inputText.addEventListener('blur', function (e) {
                    span.textContent = e.target.value;
                    span.parentNode.removeChild(e.target);
                    span.classList.remove('no-display');
                });
            inputText.type = 'text';
            inputText.classList.add('input-f');
            inputText.value = span.textContent;
            span.classList.add('no-display');
            span.parentNode.appendChild(inputText);
            inputText.focus();

        });
        li.appendChild(chkBox);
        span.innerText = e.target.value;
        li.appendChild(span);
        li.setAttribute('id', 'li-' + guid());

            li.draggable = true;

            li.addEventListener('dragstart', handleDragStart, false);
            li.addEventListener('dragenter', handleDragEnter, false);
            li.addEventListener('dragover', handleDragOver, false);
            li.addEventListener('dragleave', handleDragLeave, false);
            li.addEventListener('drop', handleDrop, false);
            li.addEventListener('dragend', handleDragEnd, false);

        //li.contentEditable = true;
        e.target.value = '';
        ulList.appendChild(li);
        showSelectedUnselected(ulList);
    }

    if (filter.checked === true) {
        var filteredSpan = ulList.querySelectorAll('li > span');
        filteredSpan.filter(function(el){
            if (el.textContent.toLowerCase().search(e.target.value) != -1) {
                el.parentNode.classList.add('filtered');
            } else {
                el.parentNode.classList.remove('filtered');
            }
        });
        showSelectedUnselected(ulList);
    }
});

filter.addEventListener('click', function(){
    var li = ulList.querySelectorAll('li');

    li.forEach(function(el){
        el.classList.remove('filtered');
    });
    showSelectedUnselected(ulList);
});

function showSelectedUnselected(ul)
{
    var totalLi = ul.querySelectorAll('li');
    var selectedLi = ul.querySelectorAll('li.selected-li');
    var filteredLi = ul.querySelectorAll('li.filtered');

    summaryResult.innerHTML = '<b>Selected:</b> ' + selectedLi.length + ' <b>Filtered:</b> '+ filteredLi.length +' <b>Total:</b> ' + totalLi.length;
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
        if (el.remove) {
            el.remove();
        } else {
            el.parentNode.removeChild(el);
        }
    });

    selectAll.checked = false;
    showSelectedUnselected(ulList);
});

var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

NodeList.prototype.forEach = function (f) {
    Array.prototype.forEach.call(this, f);
};
NodeList.prototype.filter = function (f) {
    Array.prototype.filter.call(this, f);
};
