
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

const appendPageLinks = (list) => {
    // eg. for 54 students, 6 total pages
    let totalPages = Math.ceil(list.length / 10);
    console.log(totalPages);

    let div = document.createElement('div');
    div.className = 'pagination';
    let ul = document.createElement('ul');

    div.appendChild(ul);
    pageDiv.appendChild(div);

    for (let i = 1; i <= totalPages; i++) {
        let li = document.createElement('li');
        let pageLink = document.createElement('a');
        pageLink.setAttribute('href', '#');
        pageLink.textContent = i;
        li.appendChild(pageLink);
        ul.appendChild(li);
    }

    ul.addEventListener('click', (e) => {
        //e.preventDefault();
        if(e.target.tagName === 'A') {
            let clickedLink = e.target;
            let allLinks = document.querySelectorAll('.pagination a');
            for (let i = 0; i < allLinks.length; i++) {
                if (allLinks[i] === clickedLink) {
                    clickedLink.classList.add('active');
                    let page = parseInt(clickedLink.textContent);
                    //show list of students for current page
                    showPage(list, page);
                } else{
                    allLinks[i].classList.remove('active');
                }
            }

        }
    });

    // initially display the first page
    let firstPage = document.querySelector('.pagination a');
    firstPage.classList.add('active');
    showPage(list,1);
};

const addSearch = () => {
    let div = document.createElement('div');
    div.className = 'student-search';
    let input = document.createElement('input');
    input.setAttribute('placeholder','Search for students...');
    let searchButton = document.createElement('button');
    searchButton.textContent = 'Search';

    div.appendChild(input);
    div.appendChild(searchButton);


    let pageHeader = document.querySelector('div.page-header');
    pageHeader.appendChild(div);

    // search function
    const filterList = () => {

        let textSearch = input.value.toLowerCase();
        let matches = [];

        for (let i = 0; i < completeList.length; i++) {
            let name = completeList[i].querySelector('h3').textContent;
            let email = completeList[i].querySelector('span.email').textContent;
            //console.log(name, email);
            if (name.includes(textSearch) || email.includes(textSearch)) {
                matches.push(completeList[i]);
            }
        }
        //console.log(matches);
        if(matches.length > 0) {
            appendPageLinks(matches);
        }
    };

    //input.addEventListener('keyup', filterList);
    searchButton.addEventListener('click', () => {
        //prevent triggering search on button clicks with no input
        if (input.value !== '') {
            filterList();
            //clear input field after search
            input.value = '';
        }
    });

};


window.onload = function() {
    appendPageLinks(completeList);
    addSearch();
};
