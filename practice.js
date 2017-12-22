console.log("hello from practice.js");


//Template SUBPUB. Source: https://gist.github.com/learncodeacademy/777349747d8382bfb722
var events = {
events: {},
on: function (eventName, fn) {
  this.events[eventName] = this.events[eventName] || [];
  this.events[eventName].push(fn);
},
off: function(eventName, fn) {
  if (this.events[eventName]) {
    for (var i = 0; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i] === fn) {
        this.events[eventName].splice(i, 1);
        break;
      }
    };
  }
},
emit: function (eventName, data) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(function(fn) {
      fn(data);
    });
  }
}
};


// === MODULE 1 ===
// = ADDS AND REMOVES TODOS =

var todos = (function(){
  var todos = [];

  // Keeps cache of dom elements
  // cache DOM
  var $deleteBtn = $('.btn-danger');
  var $addBtn = $('.add-item');
  var $list = $('.list-group');
  var $input = $('input');

  // bind events
  $addBtn.on('click', addTodo);
  $list.delegate('.list-item .delete', 'click', deleteTodo);

  _buildList();
  // Render the initial list of items
  function _buildList(){
    todos.forEach(insertItem);
  }

  // Reusable - inserts todo items
  function insertItem(e){
    if (e) {
      $list.append(itemStructure(e));
    }
  }

  // Reusable html snippet
  function itemStructure(e){
    return (
      '<div class="list-item">' +
        '<li class="list-group-item">' + e + '</li>' +
        '<button type="button"class="delete btn btn-danger">X</button>' +
      '</div>')
  }

  // Adds input value to todos array & todo array
  function addTodo(value){
    var item = (typeof value === "string") ? value : $input.val();
    if (item) {
      todos.push(item);
      //Publish changes to todo list
      events.emit('todosChanged', todos.length)
      insertItem(item);
    }
    $input.val('');
  }

  // Removes specific item from html & todos array
  function deleteTodo(){
    $unwanted = $(event.target).parent('.list-item');
    var i = $list.find('.list-item').index($unwanted);
    $unwanted.remove();

    todos.splice(i, 1);
    //Publish changes to todo list
    events.emit('todosChanged', todos.length)
  }

  // Public method
  return {
    addTodo: addTodo,
  }

})();


// === MODULE 2 ===
// === UPDATES THE TODO COUNT ===

var stats = (function(){
  var todoCount = 0

  // cache DOM
  $count = $('.count');

  //Subscribe to event
  events.on('todosChanged', setTodoCount);

  // Public method for updating count
  function setTodoCount(e){
    $count.html(e)
  }

})();
