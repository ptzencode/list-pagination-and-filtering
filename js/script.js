
function init () {
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

    const hidePage = () => {
        let pagination = document.querySelector('div.pagination');
        let noMatches = document.querySelector('div.no-matches');
        //clear previous view of page
        if(pagination) {
            pageDiv.removeChild(pagination);
            for (let li of completeList) {
                li.style.display = 'none';
            }
        }
        if(noMatches) {
            pageDiv.removeChild(noMatches);
        }
    };

    const appendPageLinks = (list) => {
        //clear previous view
        hidePage();

        // eg. for 54 students, 6 total pages
        let totalPages = Math.ceil(list.length / 10);

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
        let showAllButton = document.createElement('button');
        showAllButton.className = 'show-all';
        showAllButton.textContent = 'Show All';
        showAllButton.style.display = 'none';

        div.appendChild(input);
        div.appendChild(searchButton);
        div.appendChild(showAllButton);

        let pageHeader = document.querySelector('div.page-header');
        pageHeader.appendChild(div);

        // search function
        const filterList = () => {
            //show all button displayed only when search is trigerred
            showAllButton.style.display = 'inline-block';
            showAllButton.addEventListener('click', (e) => {
                input.value = '';
                appendPageLinks(completeList);
                e.target.style.display = 'none';
            });

            let textSearch = input.value.toLowerCase();
            let matches = [];

            for (let i = 0; i < completeList.length; i++) {
                let name = completeList[i].querySelector('h3').textContent;
                let email = completeList[i].querySelector('span.email').textContent;

                if (name.includes(textSearch) || email.includes(textSearch)) {
                    matches.push(completeList[i]);
                }
            }

            if(matches.length > 0) {
                appendPageLinks(matches);
            } else {
                // view for no results found
                hidePage();
                let div = document.createElement('div');
                div.className = 'no-matches';
                let h2 = document.createElement('h2');
                h2.textContent = 'No Results Found';
                div.appendChild(h2);
                pageDiv.appendChild(div);
            }
        };

        input.addEventListener('keyup', filterList);
        searchButton.addEventListener('click', () => {
            //prevent triggering search on button clicks with no input
            if (input.value !== '') {
                filterList();
                //clear input field after search
                input.value = '';
            }
        });

    };

    appendPageLinks(completeList);
    addSearch();

}
window.onload = init;