(function() {

  const body = document.querySelector('body');
  const wiper = document.createElement('div');
  const wiperImg = document.createElement('img');
  const wiperTextHolder = document.createElement('div');
  const wiperText = document.createElement('h2');
  
  wiper.classList.add('wiper');
  wiperTextHolder.classList.add('wiperTextHolder');
  wiperImg.setAttribute('src', './img/logo-icon.svg');
  wiperText.innerHTML = 'Homey';

  wiperTextHolder.append(wiperText);
  wiper.append(wiperImg);
  wiper.append(wiperTextHolder);
  body.append(wiper);

  barba.use(barbaPrefetch);
  
  barba.init({
    // debug: true,
    transitions: [
      {
        name: 'next',
        from: {
          custom: ({trigger}) => {
            return trigger.classList && trigger.classList.contains('nav-next');
          }
        },
        leave: ({current, next, trigger}) => {
          return new Promise(resolve => {
            
            const tl = gsap.timeline({
              onComplete() {
                current.container.remove(); 
                resolve();
              }
            });

            const nav = current.container.querySelectorAll('header, .nav-prev, .nav-next, .photo-info');
            const photos = current.container.querySelectorAll('.photo-group');
            
            tl
              .set(wiper, {x: '-100%'})
              .set(wiperImg, {opacity: 0})
              .set(wiperText, {y: '100%'})
              .to(nav, { opacity: 0 }, 0)
              .to(photos, { opacity: .25, x: 500 }, 0)
              .to(wiper, { x: 0 }, 0)

          })
        },
        beforeEnter: ({current, next, trigger}) => {

          wiperText.innerHTML = next.container.getAttribute('data-location');

          return new Promise(resolve => {
            const tl = gsap.timeline({
              defaults: {},
              onComplete() {
                resolve()
              }
            }); 

            tl
              .to(wiperImg, {opacity: 1}, 0)
              .to(wiperText, {y: 0}, 0)
              .to(wiperText, {y: '100%'}, 1.5)
              .to(wiperImg, {opacity: 0}, 1.5)


          });
        },
        enter: ({current, next, trigger}) => {
          return new Promise(resolve => {
            
            const tl = gsap.timeline({
              onComplete() {
                resolve();
              }
            });

            const nav = next.container.querySelectorAll('header, .nav-prev, .nav-next, .photo-info');
            const photos = next.container.querySelectorAll('.photo-group');
            
            tl
              .set(nav, { opacity: 0 })
              .set(photos, { opacity: .25, x: -500})
              .to(nav, { opacity: 1 }, 0)
              .to(photos, { opacity: 1, x: 0}, 0)
              .to(wiper, { x: '100%' }, 0)

          })
        }
      },
      {
        name: 'prev',
        leave: ({current, next, trigger}) => {
          return new Promise(resolve => {
            
            const tl = gsap.timeline({
              onComplete() {
                current.container.remove(); 
                resolve();
              }
            });

            const nav = current.container.querySelectorAll('header, .nav-prev, .nav-next, .photo-info');
            const photos = current.container.querySelectorAll('.photo-group');
            
            tl
              .set(wiper, {x: '100%'})
              .set(wiperImg, {opacity: 0})
              .set(wiperText, {y: '100%'})
              .to(nav, { opacity: 0 }, 0)
              .to(photos, { opacity: .25, x: -500 }, 0)
              .to(wiper, { x: 0 }, 0)

          })
        },
        enter: ({current, next, trigger}) => {
          return new Promise(resolve => {
            
            const tl = gsap.timeline({
              onComplete() {
                resolve();
              }
            });

            const nav = next.container.querySelectorAll('header, .nav-prev, .nav-next, .photo-info');
            const photos = next.container.querySelectorAll('.photo-group');
            
            tl
              .set(nav, { opacity: 0 })
              .set(photos, { opacity: .25, x: 500})
              .to(nav, { opacity: 1 }, 0)
              .to(photos, { opacity: 1, x: 0}, 0)
              .to(wiper, { x: '-100%' }, 0)

          })
        }
      },
    ],
    views: []
  });


})();