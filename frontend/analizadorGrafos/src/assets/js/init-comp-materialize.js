document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {});
  var elems2 = document.querySelectorAll('select');
  var instances2 = M.FormSelect.init(elems2, {});

});
