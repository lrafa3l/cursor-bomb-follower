// Ensure DOM and page are fully loaded
window.addEventListener('load', () => {
    // Create circle element dynamically
    const circle = document.createElement('div');
    circle.className = 'circle';
    document.body.appendChild(circle);
  
    // Verify circle is in DOM
    console.log('Circle appended:', circle, 'Parent:', circle.parentNode, 'Body:', document.body);
  
    // Use reliable viewport dimensions
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
    let targetX = viewportWidth / 2; // Default to viewport center
    let targetY = viewportHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let velocityX = 0, velocityY = 0;
  
    // Spring parameters
    const stiffness = 0.1;
    const damping = 0.8;
    const mass = 1;
  
    // Update target position on mouse move
    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });
  
    // Create bomb effect on click
    document.addEventListener('click', (e) => {
      const isDropdownBtn = e.target.closest('.dropdown-btn');
      const bomb = document.createElement('div');
      bomb.className = 'bomb';
      bomb.style.left = `${e.clientX}px`;
      bomb.style.top = `${e.clientY}px`;
      bomb.style.backgroundColor = isDropdownBtn ? '#4dff4d' : '#ff4d4d'; // Green for dropdown
      document.body.appendChild(bomb);
      bomb.addEventListener('animationend', () => bomb.remove());
    });
  
    // Animation loop for spring physics
    function animate() {
      const forceX = (targetX - currentX) * stiffness;
      const forceY = (targetY - currentY) * stiffness;
      velocityX = (velocityX + forceX) * damping;
      velocityY = (velocityY + forceY) * damping;
      currentX += velocityX / mass;
      currentY += velocityY / mass;
  
      // Clamp to viewport
      currentX = Math.max(10, Math.min(currentX, viewportWidth - 10));
      currentY = Math.max(10, Math.min(currentY, viewportHeight - 10));
  
      circle.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
  
      // Log position for debugging
      console.log('Position:', { currentX, currentY, targetX, targetY, viewportWidth, viewportHeight });
  
      requestAnimationFrame(animate);
    }
  
    animate();
  });
