
const store = {
  selectedUserIndex: 0,
  isSliderFrontActive: true,
// fake team data generated in mockaroo
  teamMembers: [
    { "id": 1, "name": "Bee Trevers", "email": "btrevers0@cafepress.com", "position": "Analog Circuit Design manager", "location": "Poço Verde" },
    { "id": 2, "name": "Chadwick Scobie", "email": "cscobie1@earthlink.net", "position": "Media Manager IV", "location": "Jombang" },
    { "id": 3, "name": "Gaspard Bearman", "email": "gbearman2@oracle.com", "position": "Recruiter", "location": "Kangmei" },
    { "id": 4, "name": "Obediah Pinchback", "email": "opinchback3@behance.net", "position": "Computer Systems Analyst IV", "location": "Yuecheng" },
    { "id": 5, "name": "Curtice McCorkell", "email": "cmccorkell4@networkadvertising.org", "position": "Health Coach II", "location": "Zamostochcha" },
    { "id": 6, "name": "Jasen Piola", "email": "jpiola5@goodreads.com", "position": "Payment Adjustment Coordinator", "location": "Paynjuwayn" },
    { "id": 7, "name": "Ernie Grimsdith", "email": "egrimsdith6@youtu.be", "position": "Cost Accountant", "location": "Chenjiatan" },
    { "id": 8, "name": "Roxanna MacAlaster", "email": "rmacalaster7@samsung.com", "position": "Senior Developer", "location": "Wuhao" },
  ],
}

function generateProfileHTML(data = {}, pictureVersion = 0) {
  const { photoSrc = `https://source.unsplash.com/random/200x200?v=${pictureVersion}`, id, name, position, location } = data;
  return `
    <div class="profile">
          <div class="profile__photo">
            <div data-user=${id} class="photo">
              <div class="photo__mask"></div>
              <img class="photo__img" src="${photoSrc}" alt="profile picture">
            </div>
          </div>
          <div class="profile__text">
            <h2 class='profile__text__header'>${name}</h2>
            <div class='profile__text__position'>${position}</div>
            <div class='profile__text__location'>${location}</div>
          </div>
        </div>  `
}

function setProfilesData(profilesData) {
  const teamGallery = document.getElementById('team-gallery');
  const profilesHTML = profilesData.map((person, i) => generateProfileHTML(person, i)).join('');
  teamGallery.innerHTML = profilesHTML;
}

setProfilesData(store.teamMembers);

// EVENTS
const closeModalBtn = document.getElementById('close-btn');
closeModalBtn.addEventListener('click', toggleModal);

const profiles = document.getElementsByClassName('photo');
Array.from(profiles).forEach(profile => {
  profile.addEventListener('click', setUserByDataset);
  profile.addEventListener('click', fillCurrentUserData);
  profile.addEventListener('click', toggleModal);
})

const sliderArrows = document.querySelectorAll('.slider__arrow');
sliderArrows.forEach(arrow => arrow.addEventListener('click', (event) => changeSlideHandler(event)));


// FUNCTIONS
function toggleModal() {
  const modal = document.getElementById('modal');
  modal.classList.toggle('modal--open');
};

function setUserByDataset(event) {
  const selectedUserId = Number(event.currentTarget.dataset.user);
  const userIndex = store.teamMembers.findIndex(person => person.id === selectedUserId);
  changeActiveUser(userIndex);
}

function fillCurrentUserData() {
  const frontSide = document.querySelector('#cube-front');
  const selectedUserIndex = store.selectedUserIndex;
  const selectedUser = store.teamMembers[selectedUserIndex];
  
  frontSide.innerHTML = `
    <div class="slider__text">${selectedUser.position}</div>
    <div class="slider__header">${selectedUser.name}</div>
  `;
}

function changeActiveUser(index = 0) {
  const newUser = store.teamMembers[index];
  if (newUser) { store.selectedUserIndex = index };
  return newUser;
}


// SLIDER
function changeSlideHandler(event) {
  const direction = event.target.dataset.direction || 'right';

  // change selected user 
  const directionModifier = direction === 'right' ? 1 : -1;
  const newUserIndex = store.selectedUserIndex + directionModifier;

  if (!store.teamMembers[newUserIndex]) {
    // stop the function if the person is unavailable
    return false
  }

  changeActiveUser(newUserIndex);
  changeHiddenSlideData();
  rotateSlider(event, direction);
}

function rotateSlider(event, direction) {
  const frontSide = document.querySelector('#cube-front');
  const backSide = document.querySelector('#cube-back');
  const cube = document.querySelector('.slider__content');
  
  // rotate cube's sides according to direction
  const prevRotation = getComputedStyle(cube).getPropertyValue('--rotation');
  const prevRotationNumber = parseFloat(prevRotation);
  const nextRotation = (direction === 'right') ? prevRotationNumber + 180 : prevRotationNumber - 180;
  cube.style.setProperty('--rotation', `${nextRotation}deg`);

  // switch opacities and save currently active side 
  frontSide.classList.toggle('slider__content__cube--hidden');
  backSide.classList.toggle('slider__content__cube--hidden');
  store.isSliderFrontActive = !store.isSliderFrontActive;
}

function changeHiddenSlideData() {
  const frontSide = document.querySelector('#cube-front');
  const backSide = document.querySelector('#cube-back');

  // check for active user id and get next user data
  const currentUser = store.teamMembers[store.selectedUserIndex];
 
  // append HTML to the inactive slide
  hiddenSide = store.isSliderFrontActive ? backSide : frontSide;
  hiddenSide.innerHTML = `
    <div class="slider__text">${currentUser.position}</div>
    <div class="slider__header">${currentUser.name}</div>
  `
}



/* TODO:
1. envelope events
2. optimize profiles click event
3. change close btn
4. add custom slider
5. Add more animations (modal!)
6. PixelPerfect
*/