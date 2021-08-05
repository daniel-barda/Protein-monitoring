'use strict';
/*Class*/
const LoginBtn = document.querySelector('.login__btn');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginpin = document.querySelector('.login__input--pin');
const main_body = document.querySelector('.main-body');
const userUX = document.querySelector('.user');
const items = document.querySelector('.list-group-item');
const proteinInfo = document.querySelector('.protein');
const MuchComplete = document.querySelector('.HowMuch');
const progressBar = document.querySelector('.progress-bar');
const reset = document.querySelector('.reset');

let currentAccount;
let protein;
/*Profiles*/

const profile1 = {
  username: 'Daniel',
  pin: 1234,
  protein: [+localStorage.getItem('SaveProtein')],
};

/*Attracting users*/
const profiles = [profile1];

/*Foods*/
const foods = new Map([
  ['קוטג', 23],
  ['ביצה', 11],
  ['יוגורט Pro', 20],
  ['טונה', 23],
]);

/*Login Btn*/
LoginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = profiles.find(
    acc => acc.username === inputLoginUsername.value
  ); // find user

  if (currentAccount?.pin === Number(inputLoginpin.value)) {
    main_body.style.opacity = 100;
    userUX.textContent = `${currentAccount.username}`;
    inputLoginpin.value = inputLoginUsername.value = '';

    proteinInfo.textContent = localStorage.getItem('SaveProtein');
    MuchComplete.textContent = Math.abs(
      localStorage.getItem('SaveProtein') - 98 // Calculation - How Much i Have to complete the protein
    );
    progressUpdate(currentAccount.protein + '%');
  }
});

const progressUpdate = function (num) {
  progressBar.style.width = num;
  if (localStorage.getItem('SaveProtein') >= 98) {
    progressBar.classList.remove('bg-primary');
    progressBar.classList.add('bg-success');
  }
};

foods.forEach(function (value, index, arr) {
  const html = `<li class=""> <button id="add" class="btn btn-primary add-item" data-protein="${value}">הוסף</button>
    <strong>${index}</strong> כמות חלבון ${value}</li><hr>`;
  items.insertAdjacentHTML('afterbegin', html);
});

document.querySelectorAll('.add-item').forEach(ele => {
  ele.addEventListener('click', function (e) {
    e.preventDefault();
    currentAccount.protein.push(e.target.getAttribute('data-protein'));
    protein = currentAccount.protein.reduce((acc, val) => acc + Number(val), 0);
    proteinInfo.textContent = protein;
    localStorage.setItem('SaveProtein', protein);
    MuchComplete.textContent = Math.abs(
      localStorage.getItem('SaveProtein') - 98
    );
    progressUpdate(protein + '%');
  });
});

reset.addEventListener('click', function () {
  currentAccount.protein = [0];
  proteinInfo.textContent = currentAccount.protein;
  MuchComplete.textContent = 98;
  localStorage.setItem('SaveProtein', currentAccount.protein);
  progressBar.classList.remove('bg-success');
  progressBar.classList.add('bg-primary');
  progressUpdate(0 + '%');
});
