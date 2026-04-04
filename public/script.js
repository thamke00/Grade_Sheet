// student.js

// Local storage functions
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

// Student CRUD operations
class Student {
    constructor(name, age, id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }
}

class StudentManager {
    constructor() {
        this.students = getFromLocalStorage('students') || [];
    }

    addStudent(student) {
        this.students.push(student);
        saveToLocalStorage('students', this.students);
    }

    getStudents() {
        return this.students;
    }

    updateStudent(id, updatedStudent) {
        const index = this.students.findIndex(stu => stu.id === id);
        if (index > -1) {
            this.students[index] = updatedStudent;
            saveToLocalStorage('students', this.students);
        }
    }

    deleteStudent(id) {
        this.students = this.students.filter(stu => stu.id !== id);
        saveToLocalStorage('students', this.students);
    }
}

// To-do list functions
let todoList = getFromLocalStorage('todoList') || [];

function addTodoItem(item) {
    todoList.push(item);
    saveToLocalStorage('todoList', todoList);
}

function removeTodoItem(item) {
    todoList = todoList.filter(i => i !== item);
    saveToLocalStorage('todoList', todoList);
}

function getTodoList() {
    return todoList;
}

// Form validation
function validateForm(form) {
    const name = form.name.value;
    const age = form.age.value;
    if (!name || !age) {
        alert("All fields are required!");
        return false;
    }
    return true;
}

// Search functionality
function searchStudent(query) {
    const studentManager = new StudentManager();
    return studentManager.getStudents().filter(student => student.name.toLowerCase().includes(query.toLowerCase()));
}

// API calls
async function apiCall(url, method='GET', body=null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    let response = await fetch(url, options);
    return response.json();
}

// Example usage
const studentManager = new StudentManager();
const student = new Student('John Doe', 20, '123');
studentManager.addStudent(student);

const todos = getTodoList();