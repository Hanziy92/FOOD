'use strict'; 
window.addEventListener('DOMContentLoaded', () => {

   // ТАБИ
   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items  ');


   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active'); 
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }
   showTabContent();
   hideTabContent();
   

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }

       
   });

   // Timer
   const deadline = '2022-05-11';

   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60 ) % 60),
            seconds = Math.floor((t / 1000) % 60);

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZiro(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            tinerInterval = setInterval(updateClock, 1000);
      
      updateClock();
   
      function updateClock () {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZiro(t.days);
         hours.innerHTML = getZiro(t.hours);
         minutes.innerHTML = getZiro(t.minutes);
         seconds.innerHTML = getZiro(t.seconds);

         if (t.total <= 0) {
            clearInterval(tinerInterval); 
         }
      }
   }
   setClock('.timer', deadline);

   // MODAL WINDOW

   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelector('[data-close]');


   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      // modal.classList.toggele('show');
      document.body.style.overflow = 'hidden'; // прокрутки не буде
      clearInterval(modalTimerId);
   }
    
   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }
   
   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if(e.target === modal) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 15000);


   function showModalByScroll () {
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }


   window.addEventListener('scroll', showModalByScroll);


});