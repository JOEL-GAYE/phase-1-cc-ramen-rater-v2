
const handleClick = (ramen) => {
  const ramenDetailImg = document.querySelector('#ramen-detail img');
  const ramenName = document.querySelector('#ramen-detail h2');
  const ramenRestaurant = document.querySelector('#ramen-detail h3');
  const ramenRating = document.querySelector('#rating-display');
  const ramenComment = document.querySelector('#comment-display');

  ramenDetailImg.src = ramen.image;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
};
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: e.target['new-name'].value,
      restaurant: e.target['new-restaurant'].value,
      image: e.target['new-image'].value,
      rating: e.target['new-rating'].value,
      comment: e.target['new-comment'].value,
    };

    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));  // Add click listener
    ramenMenu.appendChild(img);

    form.reset();  // Clear form
  });
};
const main = () => {
  displayRamens();   // Display all ramen on page load
  addSubmitListener();  // Listen for new ramen form submission
};

document.addEventListener('DOMContentLoaded', main);  // Run main() once the DOM is ready
const displayFirstRamen = (ramens) => {
  if (ramens.length > 0) {
    handleClick(ramens[0]);  // Display the first ramen's details
  }
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));  // Attach click event listener
        ramenMenu.appendChild(img);
      });
      displayFirstRamen(ramens);  // Display details for the first ramen
    });
};
const addEditListener = () => {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ratingInput = document.getElementById('edit-rating').value;
    const commentInput = document.getElementById('edit-comment').value;

    // Update the currently displayed ramen details
    document.getElementById('rating-display').textContent = ratingInput;
    document.getElementById('comment-display').textContent = commentInput;

    editForm.reset();  // Clear form
  });
};
const addDeleteListener = (ramen) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.querySelector(`img[alt="${ramen.name}"]`).remove();  // Remove from menu
    // Optionally, clear ramen details
    document.querySelector('#ramen-detail img').src = '';
    document.querySelector('#ramen-detail h2').textContent = '';
    document.querySelector('#ramen-detail h3').textContent = '';
    document.getElementById('rating-display').textContent = '';
    document.getElementById('comment-display').textContent = '';
  });
  document.querySelector('#ramen-detail').appendChild(deleteBtn);  // Add delete button to the details section
};
fetch('http://localhost:3000/ramens', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newRamen),
});
fetch(`http://localhost:3000/ramens/${ramen.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ rating: newRating, comment: newComment }),
});
fetch(`http://localhost:3000/ramens/${ramen.id}`, {
  method: 'DELETE',
});
