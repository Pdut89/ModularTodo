console.log("hello from practice.js");

$(document).ready(function(){

  var todos = {
    todos: ['clean', 'cook'],

    // Initialises the functional element
    init: function(){
      this.cacheDom();
      this.bindEvents();
      this.buildList();
    },

    // Keeps cache of dom elements
    cacheDom: function(){
      this.$deleteBtn = $('.btn-danger');
      this.$addBtn = $('.add-item');
      this.$list = $('.list-group');
      this.$input = $('input');
    },

    // Reusable event listeners
    bindEvents: function(){
      this.$addBtn.on('click', this.addTodo.bind(this));
      this.$list.delegate('.list-item .delete', 'click', this.deleteTodo.bind(this));
    },

    // Render the initial list of items
    buildList: function(){
      this.todos.forEach(this.insertItem.bind(this));
    },

    // Reusable - inserts todo
    insertItem: function(e){
      if (e) {
        this.$list.append(this.itemStructure(e));
      }
    },

    // Reusable html snippet
    itemStructure: function(e){
      return (
        '<div class="list-item">' +
          '<li class="list-group-item">' + e + '</li>' +
          '<button type="button"class="delete btn btn-danger">X</button>' +
        '</div>')
    },

    // Adds input value to todos array & todo array
    addTodo: function(){
      item = this.$input.val();
      if (item) {
        this.todos.push(item);
        this.insertItem(item);
      }
      this.$input.val('');
    },

    // Removes specific item from html & todos array
    deleteTodo: function(){
      $unwanted = $(event.target).parent('.list-item');
      var i = this.$list.find('.list-item').index($unwanted);

      this.todos.splice(i, 1);
      $unwanted.remove();
    }
  }

  todos.init();

});
