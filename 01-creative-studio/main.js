(function() {

  let body = document.querySelector('body');

  barba.use(barbaCss);

  barba.init({
    views: [
      {
        namespace: 'showcase',
        beforeEnter: () => {
          body.classList.add('showcase');
        },
        beforeLeave: () => {
          body.classList.remove('showcase');
        }

      }
    ],
    transitions: [{
      name: 'fade',

      // [Barba Doc] add an empty once / leave / enter hook in order to let the plugin use the transition name as class prefix
      once: () => {},
      enter: () => {},
      leave: () => {},

      beforeEnter: ({ current, next, trigger }) => {

        const navLinks = document.querySelectorAll('header nav a');
        const nextPage = next.url.path;

        navLinks.forEach(link => {
          
          if(link.getAttribute('href') === nextPage) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }

        });
 
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      } 
    }]
  });

})();