/* Dropdown menu in Nav. Followed documentation here:
https://www.w3schools.com/howto/howto_js_dropdown.asp
*/

function dropdownMenu(){
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropBtn')){
        let dropdowns = document.getElementsByClassName("dropdownContent");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdowns = dropdowns[i];
            if (openDropdowns.classList.contains('show')) {
                openDropdowns.classList.remove('show');
            }
        }
    }
}
