$(function() {
  // Sticky header & update active section on scroll
  $(window).on("scroll", () => {
    $(".header-area").toggleClass("sticky", $(window).scrollTop() > 1);
    updateActiveSection();
  });

  // Smooth scrolling for header links
  $(".header ul li a").on("click", function(e) {
    e.preventDefault();
    const target = $(this).attr("href");
    if ($(target).hasClass("active-section")) return;

    // Calculate scroll destination
    const scrollTo = target === "#home" ? 0 : $(target).offset().top - 40;
    $("html, body").animate({ scrollTop: scrollTo }, 500);

    // Update active link
    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initialize ScrollReveal animations
  ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Contact form submission to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(() => (msg.innerHTML = ""), 5000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });
});

// Function to update active header link based on scroll position
function updateActiveSection() {
  const scrollPos = $(window).scrollTop();

  // If at the top, set home as active
  if (scrollPos === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // For each section, update the active link if in view
  $("section").each(function() {
    const $section = $(this);
    const id = $section.attr("id");
    const offset = $section.offset().top;
    const height = $section.outerHeight();

    if (scrollPos >= offset - 40 && scrollPos < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(`.header ul li a[href='#${id}']`).addClass("active");
    }
  });
}
