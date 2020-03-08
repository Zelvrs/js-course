let form = document.getElementById('form');
let input = document.getElementById('text');

let wrong = function() {
    input.classList.add('wrong');

    setTimeout(function() {
        input.classList.remove('wrong');
    }, 500)
}

console.log(form)
form.addEventListener('submit', function(e) {
   if (input.value == 'Gazel') {
       alert('benar')
   } else {
       wrong();
   }

    

    e.preventDefault();
})