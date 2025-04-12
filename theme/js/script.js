/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
	'use strict';

	// Preloader js    
	$(window).on('load', function () {
		$('.preloader').fadeOut(700);
	});

	// Sticky Menu
	$(window).scroll(function () {
		var height = $('.top-header').innerHeight();
		if ($('header').offset().top > 10) {
			$('.top-header').addClass('hide');
			$('.navigation').addClass('nav-bg');
			$('.navigation').css('margin-top', '-' + height + 'px');
		} else {
			$('.top-header').removeClass('hide');
			$('.navigation').removeClass('nav-bg');
			$('.navigation').css('margin-top', '-' + 0 + 'px');
		}
	});
	// navbarDropdown
	if ($(window).width() < 992) {
		$('.navigation .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
	}

	// Background-images
	$('[data-background]').each(function () {
		$(this).css({
			'background-image': 'url(' + $(this).data('background') + ')'
		});
	});

	//Hero Slider
	$('.hero-slider').slick({
		autoplay: true,
		autoplaySpeed: 7500,
		pauseOnFocus: false,
		pauseOnHover: false,
		infinite: true,
		arrows: true,
		fade: true,
		prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
		nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
		dots: true
	});
	$('.hero-slider').slickAnimation();

	// venobox popup
	$(document).ready(function () {
		$('.venobox').venobox();
	});


	// filter
	$(document).ready(function () {
		var containerEl = document.querySelector('.filtr-container');
		var filterizd;
		if (containerEl) {
			filterizd = $('.filtr-container').filterizr({});
		}
		//Active changer
		$('.filter-controls li').on('click', function () {
			$('.filter-controls li').removeClass('active');
			$(this).addClass('active');
		});
	});

	//  Count Up
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});

})(jQuery);


  
  document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Shuffle for Courses
  
  const courseShuffle = new Shuffle(document.querySelector('.section.bg-gray .shuffle-wrapper'), {
  
      itemSelector: '.shuffle-item',
  
      sizer: null
  
  });
  
  
  // Set default filter to show Popular Courses
  
  courseShuffle.filter('popular');
  
  
  // Reset the active button state on page load
  
  const defaultButton = document.querySelector('input[name="course-filter"][value="popular"]');
  
  defaultButton.checked = true; // Set the default radio button to "Popular Courses"
  
  defaultButton.parentElement.classList.add('active'); // Add active class to the default button
  
  
  // Change the View All button link based on selection
  
  const viewAllButton = document.getElementById('viewAllButton');
  
  viewAllButton.href = 'courses.html'; // Default link for popular courses
  
  
  // Course Filter buttons
  
  document.querySelectorAll('input[name="course-filter"]').forEach(input => {
  
      input.addEventListener('change', function() {
  
          // Remove active class from all buttons
  
          document.querySelectorAll('.btn-group-toggle .btn').forEach(btn => {
  
              btn.classList.remove('active');
  
          });
  
          
  
          // Add active class to the selected button
  
          this.parentElement.classList.add('active');
  
  
          // Filter courses based on selected value
  
          courseShuffle.filter(this.value);
  
  
          // Change the View All button link based on selection
  
          switch (this.value) {
  
              case 'subharti':
  
                  viewAllButton.href = 'subharti.html';
  
                  break;
  
              case 'gyanvihar':
  
                  viewAllButton.href = 'gyanvihar.html';
  
                  break;
  
              case 'lpu':
  
                  viewAllButton.href = 'lpu.html';
  
                  break;
  
              default:
  
                  viewAllButton.href = 'courses.html'; // Default link for popular courses
  
          }
  
      });
  
  });
  
  });
  


  document.addEventListener('DOMContentLoaded', function () {
	const token = localStorage.getItem('access_token');

	if (!token) {
	  // User not logged in
	  document.getElementById('usernameDisplay').textContent = 'Guest';
	  return;
	}

	fetch('http://127.0.0.1:8000/users/me', {
	  method: 'GET',
	  headers: {
		'Authorization': 'Bearer ' + token
	  }
	})
	.then(response => {
	  if (!response.ok) {
		throw new Error('Failed to fetch user data');
	  }
	  return response.json();
	})
	.then(data => {
	  // Hide login/register links
	  const loginLink = document.getElementById('loginLink');
	  const registerLink = document.getElementById('registerLink');
	  if (loginLink) loginLink.style.display = 'none';
	  if (registerLink) registerLink.style.display = 'none';

	  // Show username and logout
	  const usernameDisplay = document.getElementById('usernameDisplay');
	  const logoutBtn = document.getElementById('logoutBtn');
	  if (usernameDisplay) {
		usernameDisplay.style.display = 'inline-block';
		usernameDisplay.innerHTML = `<span class="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block">Welcome, ${data.username}</span>`;
	  }
	  if (logoutBtn) {
		logoutBtn.style.display = 'inline-block';
	  }
	})
	.catch(error => {
	  console.error('Error fetching user data:', error);
	  document.getElementById('usernameDisplay').textContent = 'Guest';
	});
  });

  function logout() {
	localStorage.removeItem('access_token');
	window.location.reload();
  }