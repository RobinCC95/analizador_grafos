document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });

  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances2 = M.Dropdown.init(elems, {});

});
