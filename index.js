//
const inputTodo = document.querySelector('.content__input');
const btnTodo = document.querySelector('.content__btn');
const filterTodo = document.querySelector('.content__filter');
const sortTodo = document.querySelector('.content__sort');
const wrapperListTodo = document.querySelector('.content__list');
let count;
if(localStorage.getItem('todos')){
	count = JSON.parse(localStorage.getItem('todos')).length
}else{
	count = 0
}

//EvenListener
document.addEventListener('DOMContentLoaded', getLocal);
btnTodo.addEventListener('click', addTodo);
wrapperListTodo.addEventListener('click', doneItem);
filterTodo.addEventListener('click', filterToDoCheked);
sortTodo.addEventListener('click', checkedSortTodo);


//Main Functions
function addTodo(e) {
	e.preventDefault();
	let valueTodo = inputTodo.value;
	count++;
	wrapperListTodo.appendChild(createItem(valueTodo, count));

	//add todo to localStogare
	saveLocal(valueTodo);

	//Clear input
	inputTodo.value = '';
}
function createItem(value, num) {
	//create Elements
	const fragment = document.createDocumentFragment();
	const divWrap = document.createElement('div');
	const spanPriority = document.createElement('span');
	const li = document.createElement('li');
	const btnDone = document.createElement('button');
	const btnUndone = document.createElement('button');

	//addStyle for even elements
	divWrap.classList.add('list-content');
	spanPriority.classList.add('list-content__priority');
	btnDone.classList.add('list-content__done');
	btnUndone.classList.add('list-content__undone');

	//textContent
	spanPriority.textContent = num;
	li.textContent = value;

	divWrap.appendChild(spanPriority);
	divWrap.appendChild(li);
	divWrap.appendChild(btnDone);
	divWrap.appendChild(btnUndone);

	fragment.appendChild(divWrap);
	return fragment;
}

function doneItem(e) {
	const item = e.target;
	if (item.classList[0] === 'list-content__done') {
		item.parentElement.style.transition = 'all .5s ease 0s';
		item.parentElement.classList.toggle('completed');
	}
	if (item.classList[0] === 'list-content__undone') {
		item.parentElement.style.transition = 'all 1s ease 0s';
		item.parentElement.classList.add('del');
		removeLocalItem(item.parentElement);
		item.parentElement.addEventListener('transitionend', () => {
			item.parentElement.remove();
		});
		count--;
	}
}

function filterToDoCheked(e) {
	const filter = wrapperListTodo.childNodes;
	filter.forEach((item) => {
		switch (e.target.value) {
			case 'all':
				item.style.display = 'flex';
				break;
			case 'done':
				if (item.classList.contains('completed')) {
					item.style.display = 'flex';
				} else {
					item.style.display = 'none';
				}
				break;
			case 'undone':
				if (!item.classList.contains('completed')) {
					item.style.display = 'flex';
				} else {
					item.style.display = 'none';
				}
				break;
		}
	});
}
function checkedSortTodo(e) {
	let sort = wrapperListTodo.children;
	let dir = e.target.value;

    Array.from(sort)
			.sort((a, b) => {
				if(dir === 'asc'){
					return a.children[0].textContent - b.children[0].textContent;
				}else if(dir === 'desc'){
					return b.children[0].textContent - a.children[0].textContent;
				}
				
			})
			.forEach((item) => {
				wrapperListTodo.appendChild(item);
			});
}
function saveLocal(el, num) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(el);

	localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocal() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach((item, index) => {
		wrapperListTodo.appendChild(createItem(item, index + 1));
	});
}

function removeLocalItem(el, num) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const indexItem = el.children[1].textContent;

	todos.splice(todos.indexOf(indexItem), 1);

	localStorage.setItem('todos', JSON.stringify(todos));
}
