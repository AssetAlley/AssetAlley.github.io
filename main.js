let tabIndex = 0;
let timer;

function showCard(index) {

  clearTimeout(timer);

  const cards = document.querySelectorAll('.carousel-card');
  let maxHeight = 0;

  // Calculate the maximum height of all cards
  cards.forEach(card => {
      card.style.display = 'block'; // Temporarily display all cards to measure height
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
      }
      card.style.display = 'none'; // Hide the card again
  });

  // Set the height of the active card to the maximum height
  cards.forEach((card, i) => {
      if (i === index) {
          card.style.display = 'block';
          card.style.height = `${maxHeight}px`;
      } else {
          card.style.display = 'none';
      }
  });
  tabIndex = index;
  timer = window.setInterval(autoSwitchTab, 5000);
}

// Show the first card by default
document.addEventListener('DOMContentLoaded', () => {
  showCard(0);
  timer = window.setInterval(autoSwitchTab, 5000);
});

function autoSwitchTab() {
  tabIndex++;
  if (tabIndex > 3) {
      tabIndex = 0;
  }
  showCard(tabIndex);
}