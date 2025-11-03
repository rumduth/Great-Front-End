export default function ContactForm() {
  async function sendRequest({ name, message, email }) {
    if (!name || !message || !email) throw new Error("Missing Data!");
    const res = await fetch(
      "https://questions.greatfrontend.com/api/questions/contact-form ",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, email }),
      }
    );
    if (!res.ok) throw new Error("Invalid Request!");
    console.log(res);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    let fd = new FormData(form);
    const name = fd.get("name").trim();
    const email = fd.get("email").trim();
    const message = fd.get("message").trim();
    try {
      await sendRequest({ name, message, email });
      alert(`Thank you ${name}, your message was received succesfully!`);
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="formRow">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="formRow">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="formRow">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message"></textarea>
        </div>
        <button>Send</button>
      </form>
    </div>
  );
}
