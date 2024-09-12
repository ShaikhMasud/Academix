document.querySelectorAll('.stream-box').forEach(box => {
    box.addEventListener('click', () => {
        let stream = box.id;
        window.location.href = `/${stream}-overview.html`; // Example of navigating to a stream's overview page
    });
});


function toggleLogoutMenu() {
    const logoutMenu = document.getElementById('logoutMenu');
    if (logoutMenu.style.display === 'block') {
        logoutMenu.style.display = 'none';
    } else {
        logoutMenu.style.display = 'block';
    }
}

function logout() {
    alert('Logging out...');
    // Add your logout logic here
}



(function() {
  "use strict";

  var cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let gloss = card.querySelector('.card__gloss'),
        width = card.offsetWidth,
        height = card.offsetHeight;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let requestId;

    // Bind mousemove event to each card
    card.addEventListener('mousemove', (event) => {
      let rect = card.getBoundingClientRect();
      mouseX = event.clientX - rect.left - width / 2;
      mouseY = event.clientY - rect.top - height / 2;

      if (!requestId) {
        requestId = requestAnimationFrame(() => updateParallax(card, gloss, width, height));
      }
    });

    card.addEventListener('mouseleave', () => {
      resetTilt(card, gloss);
    });

    function updateParallax(card, gloss, width, height) {
      currentX += (mouseX - currentX) * 0.1;  // Smooth transition
      currentY += (mouseY - currentY) * 0.1;

      light(currentX, currentY, gloss, width, height);
      tilt(currentX, currentY, card, width, height);

      if (Math.abs(mouseX - currentX) < 0.1 && Math.abs(mouseY - currentY) < 0.1) {
        requestId = null;  // Stop the animation if it's very close to the target
      } else {
        requestId = requestAnimationFrame(() => updateParallax(card, gloss, width, height));
      }
    }

    function light(x, y, gloss, width, height) {
      let angle = (Math.atan2(y, x) * 180) / Math.PI - 90;
      gloss.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255,' + (y / height * 0.9) + ') 0%, rgba(255, 255, 255, 0) 80%)';    
    }

    function tilt(x, y, card, width, height) {
      let force = 40, // Adjusted force for smoother effect
          rx = (x / width) * force,
          ry = (y / height) * -force;

      card.style.transform = 'rotateY(' + (rx) + 'deg) rotateX(' + (ry) + 'deg)';
    }

    function resetTilt(card, gloss) {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      gloss.style.background = 'none';
    }
  });
})();


