 // Check if script.js is loaded
 console.log("script.js is loaded!");
 // Attach a 'keyup' event listener to the search bar
 document.getElementById('search-bar').addEventListener('keyup', function() {
         // Get the input value from the search bar and convert it to lowercase
             let input = this.value.toLowerCase();
                 
                         // Get all the list items (li) within the university list (ul)
                             let listItems = document.querySelectorAll('#uniList li');
                              
                                 // Loop through each list item
                                     listItems.forEach(function(item) {
                                                 // Get the anchor tag (university name) inside the list item
                                                         let universityName = item.textContent.toLowerCase();
 
                                                                 // Log the university name for debugging
                                                                         console.log("University name:", universityName);
 
                                                                                 // Check if the search input matches part of the university name
                                                                                         if (universityName.includes(input) ) {
                                                                                                         // If a match is found, make sure the item is visible
                                                                                                                     item.style.display = "";  // Reset display property to show the item
                                                                                         } else {
                                                                                                         // If no match is found, hide the item
                                                                                                                     item.style.display = "none";
                                                                                         }
                                                                                             });
                                                                                         });
                                                                                         