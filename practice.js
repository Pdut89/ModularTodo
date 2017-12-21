console.log("hello from practice.js");



var todos = (function(){

  var todos = ['clean', 'cook'];

  // Keeps cache of dom elements
  // cache dom
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
      insertItem(item);
    }
    $input.val('');
  }

  // Removes specific item from html & todos array
  function deleteTodo(){
    $unwanted = $(event.target).parent('.list-item');
    var i = $list.find('.list-item').index($unwanted);

    todos.splice(i, 1);
    $unwanted.remove();
  }

  function hello(){
    console.log("hi")
  }

  return {
    hello: hello,
    addTodo: addTodo
  }

})();
