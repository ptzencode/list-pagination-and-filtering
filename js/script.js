
let completeList = document.querySelectorAll('li.student-item');
let pageDiv = document.querySelector('div.page');

const showPage = (list,page) => {
    // for page 1 ,show student 1 - 10
    // list index starts at 0, hence show index 0 - 9
    // endIndex (1 * 10) -1 = 9
    // startIndex 9 - 9 = 0
    let endIndex = (page * 10) - 1;
    let startIndex = endIndex - 9;
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            list[i].style.display = 'block';
        } else{
            list[i].style.display = 'none';
        }
    }
};

showPage(completeList,1);