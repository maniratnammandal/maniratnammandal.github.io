/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

};

/*============================= Theme change ================================ */

document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  checkbox.checked = false; // Ensure the checkbox starts unchecked
});

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("light-mode")
})



/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };

    });


    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

    if (isSmallScreen){
      header.classList.toggle('sticky', window.scrollY > 1);
    } else{
      header.classList.toggle('sticky', window.scrollY > 100);
    }

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};



/*==================== scroll reveal ====================*/
ScrollReveal({
    reset: true,
    distance: '50px',
    duration: 1500,
    delay: 50
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.interests-education', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1', { origin: 'left' })
// ScrollReveal().reveal('.cd-timeline-content', { origin: 'left' });
ScrollReveal().reveal('.portfolio-heading', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .hobbies-box, .portfolio-box', { origin: 'right' })

ScrollReveal().reveal('  .contact form', { origin: 'bottom' });

function isElementInViewport(el, threshold = 0) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Check if the element is partially visible in the viewport
  // Check if the top 10% of the element is visible
  return (
    rect.top <= windowHeight * (1 - threshold) && // Top is in the viewport within the threshold
    rect.top >= 0 // Element is not completely scrolled out of view
  );
}


function isParentInViewport(parent) {
  const rect = parent.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // Check if the parent container is fully out of view
  return rect.top < windowHeight && rect.bottom > 0;
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.cd-timeline-content');
  const parent = document.querySelector('.cd-container');
  elements.forEach(el => {
    if (isElementInViewport(el, 0)){ // Trigger when 20% of the element is visible
      el.classList.add('animated');
    } else if (!isParentInViewport(parent)) {
      // Remove the animated class only if the parent is not visible
      el.classList.remove('animated');
    }
  });
}

// Trigger animations on scroll and load
window.addEventListener('scroll', animateOnScroll);

// document.addEventListener("DOMContentLoaded", () => {
//     const timelineContents = document.querySelectorAll(".cd-timeline-content");
//
//     const observer = new IntersectionObserver(
//         (entries, observer) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     // Add 'in-view' class to trigger the animation
//                     entry.target.classList.add("in-view");
//                     observer.unobserve(entry.target); // Stop observing after animation triggers
//                 }
//             });
//         },
//         {
//             threshold: 0.3, // Trigger when 30% of the content is visible
//             rootMargin: "0px 0px -50px 0px", // Triggers slightly earlier
//         }
//     );
//
//     for (let i = 0; i < timelineContents.length; i++) {
//         const content = timelineContents[i];
//         observer.observe(content);
//     }
// });


/*==================== Contact Form to Email====================*/

// Dynamically load external scripts
function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Load SweetAlert2 and EmailJS SDK
loadScript("https://cdn.jsdelivr.net/npm/sweetalert2@11", function () {
    console.log("SweetAlert2 loaded successfully.");
});
loadScript("https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js", function () {
    console.log("EmailJS SDK loaded successfully.");
    emailjs.init("LwAImyYZkhneA6dC_"); // Replace with your EmailJS Public Key
});

const form = document.querySelector('form');

// Function to send an email
function sendEmail() {
    // Collect form input values
    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Prepare the template parameters
    const templateParams = {
        from_name: fullName,
        from_email: email,
        subject: subject,
        message: message
    };

    // Show loading indicator
    Swal.fire({
        title: "Sending...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Send email using EmailJS
    emailjs.send("service_0akuw7a", "template_bxcktnb", templateParams)
        .then(function (response) {
            Swal.close(); // Close the loading popup

            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Your message has been sent successfully!",
                icon: "success"
            });

            // Reset the form
            document.querySelector("form").reset();
        }, function (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to send your message. Please try again later.",
                icon: "error"
            });
            console.error("Email failed to send:", error);
        });
}

//
// const form = document.querySelector('form');
// const fullName = document.getElementById("name");
// const email = document.getElementById("email");
// const subject = document.getElementById("subject");
// const mess = document.getElementById("message");
//
//
// function sendEmail() {
//     const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Message: ${mess.value}`;
//
//     // Show loading indicator
//     Swal.fire({
//         title: "Sending...",
//         allowOutsideClick: false,  // Prevent users from closing the popup
//         onBeforeOpen: () => {
//             Swal.showLoading();
//         }
//     });
//
//     Email.send({
//         SecureToken: "453aa632-76ca-4970-a856-1aed1c449463",
//         To: 'vx2.718@gmail.com',
//         From: "vx2.718@gmail.com",
//         Subject: subject.value,
//         Body: bodyMessage
//     }).then(
//         message => {
//             if (message === "OK") {
//                 // Close the loading indicator popup
//                 Swal.close();
//
//                 // Show success message
//                 Swal.fire({
//                     title: "Great Success!",
//                     text: "Your message has been sent successfully!",
//                     icon: "success"
//                 });
//
//                 form.reset();  // Reset the form after successful submission
//             } else {
//                 // Handle the case where the email sending fails
//                 Swal.fire({
//                     title: "Error",
//                     text: "There was an error sending your message. Please try again later.",
//                     icon: "error"
//                 });
//             }
//         }
//     );
// }

form.addEventListener('submit', (e) => {

    e.preventDefault();
    items = checkInput();
    [fullName,email,subject,message] = items

    if (!fullName.classList.contains("error") && !email.classList.contains("error")
        && !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();
    }
});



function checkInput() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });


        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");

            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
    return items;
}

function checkEmail() {
    const emailRegex = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})?$/;
    const errorTextEmail = document.querySelector(" .error-text.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTextEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTextEmail.innerText = "Email Address cannot be blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}


/*
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInput();
    if (!fullName.classList.contains("error") && !email.classList.contains
("error") && !subject.classList.contains("error") &&
!mess.classList.contains("error")){
    sendEmail();

    //form.reset();
    //return false;
}

});*/


/*==================== typed js ====================*/
