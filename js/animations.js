gsap.registerPlugin(ScrollTrigger);

gsap.from('#mh1', {duration: 1, y:-50, opacity:0, delay: 0.25, ease: "expo.out"});
gsap.from('#mp', {duration: 0.5, opacity: 0, delay: 0.5});
gsap.from('#learnbtn', {duration: 1, opacity: 0, delay: 1, ease: 'power1.out'});


var learnbtn = document.querySelector('#learnbtn');

function parallaxIt(e, target, movement = 1) {
  var boundingRect = learnbtn.getBoundingClientRect();
  var relX = e.pageX - boundingRect.left;
  var relY = e.pageY - boundingRect.top;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  gsap.to(target, {
    x: (relX - boundingRect.width/2) * movement,
    y: (relY - boundingRect.height/2 - scrollTop) * movement,
    ease: "power1",
    duration: 0.6
  });
}

function callParallax(e){
  parallaxIt(e, '#learnbtn');
}


learnbtn.addEventListener('mousemove', function(e){
  callParallax(e);
});

learnbtn.addEventListener('mouseleave', function(e){
  gsap.to('#learnbtn', {
    scale:1,
    x: 0,
    y: 0,
    ease: "elastic",
    duration: 1
  });
});