// Callbacks
const handleClick = (ramen) => {
  const img = document.querySelector('#ramen-detail img');
  const name = document.querySelector('#ramen-detail h2');
  const restaurant = document.querySelector('#ramen-detail h3');
  const rating = document.getElementById('rating-display');
  const comment = document.getElementById('comment-display');


  if (img && name && restaurant && rating && comment) {
    // Update DOM with correct ramen details
    img.src = ramen.image;
    name.innerText = ramen.name;
    restaurant.innerText = ramen.restaurant;
    rating.innerText = ramen.rating;
    comment.innerText = ramen.comment;
  } else {
    console.error('Error: One or more elements are missing from the DOM.');
  }
};


const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');  
  form.addEventListener('submit', event => {
    event.preventDefault();

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target.comment.value,
    };

    // Add new ramen to menu
    addRamenToMenu(newRamen);

    // Reset form after submission
    form.reset();
  });
};

// Add ramen to the menu
function addRamenToMenu(ramen) {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  // Attach click listener to display details when clicked
  img.addEventListener('click', () => handleClick(ramen));

  // Append to the ramen menu
  document.getElementById('ramen-menu').appendChild(img);
}

// Fetch and display ramen data
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')  
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = '';  
      ramens.forEach(ramen => {
        addRamenToMenu(ramen);  u
      });

      // Display the first ramen by default
      if (ramens.length > 0) {
        handleClick(ramens[0]);  
      }
    });
};

// Event listener for editing a ramen
function addEditListener() {
  const form = document.getElementById('new-ramen'); 
  form.addEventListener('submit', event => {
    event.preventDefault();

    const updatedRating = event.target['edit-rating'].value;
    const updatedComment = event.target['edit-comment'].value;

    
    document.getElementById('rating-display').innerText = updatedRating;
    document.getElementById('comment-display').innerText = updatedComment;
  });
}

// Update ramen rating and comment on the server using PATCH
function updateRamen(ramenId, updatedData) {
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then(response => response.json())
    .then(data => console.log('Updated Ramen:', data));
}

// Add new ramen to the server using POST
function createRamen(ramenData) {
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ramenData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('New Ramen Added:', data);
      addRamenToMenu(data);  
    });
}

// Delete 
function deleteRamen(ramenId) {
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'DELETE',
  }).then(() => console.log('Ramen deleted'));
}


const main = () => {
  displayRamens();  
  addSubmitListener();  
  addEditListener(); 
  handleClick  
};

document.addEventListener('DOMContentLoaded', main);  
// Export functions for testing purposes
export {
  displayRamens,
  addSubmitListener,
  addEditListener,
  handleClick,
  main,
};
