// Initialize 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Starfield
const particleCount = 2000;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 50;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.15,
  transparent: true,
  opacity: 0.7,
});
const starField = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(starField);

// Interactive Objects Array
const interactiveObjects = [];

// Planet
const planetGeo = new THREE.SphereGeometry(1, 32, 32);
const planetMat = new THREE.MeshStandardMaterial({ color: 0x2a85ff });
const planet = new THREE.Mesh(planetGeo, planetMat);
planet.position.set(-4, 2, -10);
planet.userData.originalScale = planet.scale.clone();
scene.add(planet);
interactiveObjects.push(planet);

// Rocket Navigation Vehicle
const rocketGroup = new THREE.Group();
const rocketBodyGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 32);
const rocketBodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const rocketBody = new THREE.Mesh(rocketBodyGeo, rocketBodyMat);
rocketBody.position.y = 0;
rocketGroup.add(rocketBody);
const rocketNoseGeo = new THREE.ConeGeometry(0.2, 0.5, 32);
const rocketNoseMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const rocketNose = new THREE.Mesh(rocketNoseGeo, rocketNoseMat);
rocketNose.position.y = 1;
rocketGroup.add(rocketNose);
const finGeo = new THREE.BoxGeometry(0.05, 0.2, 0.4);
const finMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const fin1 = new THREE.Mesh(finGeo, finMat);
fin1.position.set(0.15, -0.5, 0);
rocketGroup.add(fin1);
const fin2 = fin1.clone();
fin2.position.set(-0.15, -0.5, 0);
rocketGroup.add(fin2);
rocketGroup.position.set(2, 3, -9);
rocketGroup.userData.originalScale = rocketGroup.scale.clone();
scene.add(rocketGroup);
interactiveObjects.push(rocketGroup);

// Telescope
const telescopeGroup = new THREE.Group();
const barrelGeo = new THREE.CylinderGeometry(0.15, 0.15, 2, 32);
const barrelMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const barrel = new THREE.Mesh(barrelGeo, barrelMat);
telescopeGroup.add(barrel);
const lensGeo = new THREE.SphereGeometry(0.2, 32, 32);
const lensMat = new THREE.MeshStandardMaterial({ color: 0x2222ff });
const lens = new THREE.Mesh(lensGeo, lensMat);
lens.position.y = 1;
telescopeGroup.add(lens);
telescopeGroup.position.set(-2, -2, -6);
telescopeGroup.userData.originalScale = telescopeGroup.scale.clone();
scene.add(telescopeGroup);
interactiveObjects.push(telescopeGroup);

// Satellite
const satelliteGroup = new THREE.Group();
const satBodyGeo = new THREE.BoxGeometry(0.5, 0.3, 0.3);
const satBodyMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
satelliteGroup.add(satBody);
const antennaGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
const antennaMat = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
const antenna1 = new THREE.Mesh(antennaGeo, antennaMat);
antenna1.rotation.z = Math.PI / 2;
antenna1.position.set(0.35, 0, 0);
satelliteGroup.add(antenna1);
const antenna2 = antenna1.clone();
antenna2.position.set(-0.35, 0, 0);
satelliteGroup.add(antenna2);
satelliteGroup.position.set(-3, -2, -7);
satelliteGroup.userData.originalScale = satelliteGroup.scale.clone();
scene.add(satelliteGroup);
interactiveObjects.push(satelliteGroup);

// Sun
const sunGeo = new THREE.SphereGeometry(1.2, 32, 32);
const sunMat = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  emissive: 0xffaa00,
  emissiveIntensity: 1,
});
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.position.set(5, 5, -15);
sun.userData.originalScale = sun.scale.clone();
scene.add(sun);
interactiveObjects.push(sun);

// Flying Girl with Tech Computer
const textureLoader = new THREE.TextureLoader();
const girlTexture = textureLoader.load(
  "https://via.placeholder.com/200x250?text=Girl+with+Tech"
);
const girlGeometry = new THREE.PlaneGeometry(2, 2.5);
const girlMaterial = new THREE.MeshBasicMaterial({
  map: girlTexture,
  transparent: true,
});
const girl = new THREE.Mesh(girlGeometry, girlMaterial);
girl.position.set(-10, 3, -8);
girl.userData.originalScale = girl.scale.clone();
scene.add(girl);
interactiveObjects.push(girl);
gsap.to(girl.position, {
  x: 10,
  duration: 25,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});
gsap.to(girl.rotation, {
  z: 0.2,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});
gsap.to(girl.scale, {
  x: girl.scale.x * 1.05,
  y: girl.scale.y * 1.05,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Tech Computer attached to Girl
const computerTexture = textureLoader.load(
  "https://via.placeholder.com/150x100?text=Computer"
);
const computerGeometry = new THREE.PlaneGeometry(1.5, 1);
const computerMaterial = new THREE.MeshBasicMaterial({
  map: computerTexture,
  transparent: true,
});
const computerScreen = new THREE.Mesh(computerGeometry, computerMaterial);
girl.add(computerScreen);
computerScreen.position.set(2.5, -0.5, 0);
gsap.to(computerScreen.rotation, {
  y: Math.PI * 2,
  duration: 20,
  repeat: -1,
  ease: "none",
});

// New: Space Man Rocket (with drag & drop & random movement)
const spaceManRocket = new THREE.Group();
// Rocket body
const smrBodyGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
const smrBodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const smrBody = new THREE.Mesh(smrBodyGeo, smrBodyMat);
spaceManRocket.add(smrBody);
// Rocket nose
const smrNoseGeo = new THREE.ConeGeometry(0.15, 0.4, 32);
const smrNoseMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const smrNose = new THREE.Mesh(smrNoseGeo, smrNoseMat);
smrNose.position.y = 0.7;
spaceManRocket.add(smrNose);
// Space Man (using a placeholder texture)
const spaceManTexture = textureLoader.load(
  "https://via.placeholder.com/100x100?text=Space+Man"
);
const spaceManGeo = new THREE.PlaneGeometry(0.6, 0.8);
const spaceManMat = new THREE.MeshBasicMaterial({
  map: spaceManTexture,
  transparent: true,
});
const spaceMan = new THREE.Mesh(spaceManGeo, spaceManMat);
spaceMan.position.y = 0.5;
spaceManRocket.add(spaceMan);
// Random initial position
spaceManRocket.position.set(
  Math.random() * 20 - 10,
  2,
  Math.random() * -10 - 5
);
spaceManRocket.userData.originalScale = spaceManRocket.scale.clone();
scene.add(spaceManRocket);
interactiveObjects.push(spaceManRocket);

// Random running movement for Space Man Rocket
function randomMove(obj) {
  let newX = Math.random() * 20 - 10;
  let newZ = Math.random() * -10 - 5;
  gsap.to(obj.position, {
    x: newX,
    z: newZ,
    duration: 5 + Math.random() * 5,
    ease: "power1.inOut",
    onComplete: () => {
      randomMove(obj);
    },
  });
}
randomMove(spaceManRocket);

// Drag & Drop Variables for Space Man Rocket
let draggedObject = null;
const dragPlane = new THREE.Plane();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mousedown: start dragging if spaceManRocket is clicked
document.addEventListener("mousedown", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([spaceManRocket], true);
  if (intersects.length > 0) {
    draggedObject = intersects[0].object;
    if (
      draggedObject.parent &&
      interactiveObjects.includes(draggedObject.parent)
    ) {
      draggedObject = draggedObject.parent;
    }
    // Enlarge the rocket slightly when dragging starts
    gsap.to(draggedObject.scale, {
      x: draggedObject.userData.originalScale.x * 1.3,
      y: draggedObject.userData.originalScale.y * 1.3,
      z: draggedObject.userData.originalScale.z * 1.3,
      duration: 0.2,
    });
    dragPlane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()).negate(),
      draggedObject.position
    );
  }
});

// Mousemove: if dragging, update the object's position
document.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(dragPlane, intersection);
  if (draggedObject && intersection) {
    draggedObject.position.copy(intersection);
  }
});

// Mouseup: end dragging and return scale to normal
document.addEventListener("mouseup", () => {
  if (draggedObject) {
    gsap.to(draggedObject.scale, {
      x: draggedObject.userData.originalScale.x,
      y: draggedObject.userData.originalScale.y,
      z: draggedObject.userData.originalScale.z,
      duration: 0.2,
    });
    draggedObject = null;
  }
});

// Additional interactive feature: double-click on the space man rocket to trigger a flip animation
document.addEventListener("dblclick", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([spaceManRocket], true);
  if (intersects.length > 0) {
    gsap.to(spaceManRocket.rotation, {
      x: spaceManRocket.rotation.x + Math.PI * 2,
      duration: 1,
      ease: "power1.inOut",
    });
  }
});

// Floating Tech Elements
const techElements = [];
const geometries = [
  new THREE.IcosahedronGeometry(0.5),
  new THREE.OctahedronGeometry(0.5),
  new THREE.TorusKnotGeometry(0.3, 0.1),
];
for (let i = 0; i < 20; i++) {
  const geometry = geometries[Math.floor(Math.random() * geometries.length)];
  const position = new THREE.Vector3(
    Math.random() * 40 - 20,
    Math.random() * 40 - 20,
    Math.random() * 40 - 20
  );
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
    shininess: 100,
  });
  const element = new THREE.Mesh(geometry, material);
  element.position.copy(position);
  scene.add(element);
  techElements.push(element);
}

// Playful Sky: Floating Clouds
const cloudTexture = new THREE.TextureLoader().load(
  "https://threejsfundamentals.org/threejs/resources/images/cloud.png"
);
const cloudGroup = new THREE.Group();
for (let i = 0; i < 8; i++) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map: cloudTexture,
    opacity: 0.5,
  });
  const cloudSprite = new THREE.Sprite(spriteMaterial);
  cloudSprite.scale.set(5, 3, 1);
  cloudSprite.position.set(
    Math.random() * 40 - 20,
    Math.random() * 10 + 5,
    Math.random() * -20 - 10
  );
  cloudGroup.add(cloudSprite);
}
scene.add(cloudGroup);

// Raycaster for Hover Effects (for non-drag interactions)
let hoveredObject = null;
document.addEventListener("mousemove", (e) => {
  // This block updates the mouse coordinates for raycasting
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// --- Enhanced Custom Cursor & Sparkle Effect (Magnifier Style) ---
// Note: Ensure your CSS for #custom-cursor sets it to a larger size (e.g., 80px x 80px)
// and styles it like a magnifier (with a circular shape, border, background, and box-shadow).
const cursor = document.querySelector('#custom-cursor');
gsap.set(cursor, { scale: 1 }); // default scale

document.addEventListener('mousemove', function(e) {
  // Smoothly move the custom magnifier-style cursor
  gsap.to(cursor, {
    duration: 0.1,
    x: e.clientX,
    y: e.clientY,
    ease: "power2.out"
  });

  // Create a sparkle effect at the cursor's location
  let sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  document.body.appendChild(sparkle);
  
  gsap.to(sparkle, {
    duration: 0.5,
    opacity: 0,
    scale: 2,
    ease: "power2.out",
    onComplete: () => sparkle.remove()
  });
});

// Add hover effects for interactive elements (links, buttons, etc.)
const interactiveElements = document.querySelectorAll('a, button, .interactive');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      duration: 0.2,
      scale: 1.3,
      backgroundColor: "rgba(255,107,107,0.8)"
    });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      duration: 0.2,
      scale: 1,
      backgroundColor: "#fff"
    });
  });
});

// Click Event for Navigation via Rocket
document.addEventListener("click", (e) => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveObjects, true);
  if (intersects.length > 0) {
    let clickedObject = intersects[0].object;
    if (
      clickedObject.parent &&
      interactiveObjects.includes(clickedObject.parent)
    ) {
      clickedObject = clickedObject.parent;
    }
    if (clickedObject === rocketGroup) {
      const sections = [
        "hero",
        "about",
        "projects",
        "skills",
        "education",
        "contact",
      ];
      let currentScroll = window.scrollY;
      let targetSection = null;
      for (let i = 0; i < sections.length; i++) {
        const sec = document.getElementById(sections[i]);
        if (sec.offsetTop > currentScroll + 50) {
          targetSection = sec;
          break;
        }
      }
      if (!targetSection) {
        targetSection = document.getElementById(sections[0]);
      }
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  planet.rotation.y += 0.001;
  rocketGroup.rotation.y += 0.005;
  telescopeGroup.rotation.z += 0.002;
  satelliteGroup.rotation.x += 0.003;
  sun.rotation.y += 0.001;
  techElements.forEach((el, idx) => {
    el.rotation.x += 0.01;
    el.rotation.y += 0.01;
    el.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.005;
  });
  cloudGroup.children.forEach((cloud) => {
    cloud.position.x += 0.001;
    if (cloud.position.x > 25) {
      cloud.position.x = -25;
    }
  });
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveObjects, true);
  if (intersects.length > 0) {
    let obj = intersects[0].object;
    if (obj.parent && interactiveObjects.includes(obj.parent)) {
      obj = obj.parent;
    }
    if (hoveredObject !== obj) {
      if (hoveredObject) {
        gsap.to(hoveredObject.scale, {
          x: hoveredObject.userData.originalScale.x,
          y: hoveredObject.userData.originalScale.y,
          z: hoveredObject.userData.originalScale.z,
          duration: 0.3,
        });
      }
      hoveredObject = obj;
      gsap.to(hoveredObject.scale, {
        x: hoveredObject.userData.originalScale.x * 1.2,
        y: hoveredObject.userData.originalScale.y * 1.2,
        z: hoveredObject.userData.originalScale.z * 1.2,
        duration: 0.3,
      });
    }
  } else {
    if (hoveredObject) {
      gsap.to(hoveredObject.scale, {
        x: hoveredObject.userData.originalScale.x,
        y: hoveredObject.userData.originalScale.y,
        z: hoveredObject.userData.originalScale.z,
        duration: 0.3,
      });
      hoveredObject = null;
    }
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

AOS.init({ duration: 1000 });

// Floating Navigation Interactions
document.querySelectorAll(".nav-node").forEach((node) => {
  node.addEventListener("click", () => {
    const section = document.getElementById(node.dataset.section);
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// Initialize VanillaTilt for Skill Cards
VanillaTilt.init(document.querySelectorAll(".skill-card"), {
  max: 10,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
});

// Project Section Filtering
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons and add to the current one
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block";
        } else {
          // Each card can have multiple categories (space-separated)
          const categories = card.getAttribute("data-category").split(" ");
          if (categories.includes(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
});
