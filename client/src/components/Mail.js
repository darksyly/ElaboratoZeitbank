import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_35d78zg', 'template_fvq6w36', e.target, 'user_uBxIGhJkrYJ9nlNN6Q3FC')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
    <h1>--------- Email ----------</h1>
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Send to</label>
      <input type="email" name="toUserMail" />
      <label>Your Name</label>
      <input type="text" name="fromUserName" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    </>
  );
}

