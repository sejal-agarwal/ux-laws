"use client";

// A contact card whose details are grouped into labelled chunks.
const CONTACT = {
  name: "Bobby",
  birthday: "March 21, 2002",
  phone: "(604) 555-0142",
  email: "bobby@honeymail.com",
};

/** A doodled bear, drawn in the site's browns. */
function Bear() {
  return (
    <svg className="cc-pfp" viewBox="0 0 80 80" aria-label="Doodle of a bear" role="img">
      <circle cx="20" cy="20" r="11" className="cc-fur" />
      <circle cx="60" cy="20" r="11" className="cc-fur" />
      <circle cx="20" cy="20" r="5" className="cc-snout" />
      <circle cx="60" cy="20" r="5" className="cc-snout" />
      <circle cx="40" cy="42" r="28" className="cc-fur" />
      <ellipse cx="40" cy="52" rx="13" ry="10" className="cc-snout" />
      <circle cx="30" cy="38" r="2.6" className="cc-ink" />
      <circle cx="50" cy="38" r="2.6" className="cc-ink" />
      <ellipse cx="40" cy="48" rx="4.5" ry="3.2" className="cc-ink" />
      <path d="M40 51 v4 M34 57 q6 5 12 0" className="cc-line" />
      <circle cx="24" cy="48" r="3.5" className="cc-blush" />
      <circle cx="56" cy="48" r="3.5" className="cc-blush" />
    </svg>
  );
}

/** A clear name, then two labelled groups, with the phone number split the way people say it. */
export default function ContactCard() {
  const c = CONTACT;
  return (
    <div className="cc">
      <Bear />
      <h3 className="cc-name">{c.name}</h3>
      <div className="cc-groups">
        <section>
          <h4>Contact</h4>
          <dl>
            <dt>Phone</dt>
            <dd>{c.phone}</dd>
            <dt>Email</dt>
            <dd>{c.email}</dd>
          </dl>
        </section>
        <section>
          <h4>About</h4>
          <dl>
            <dt>Birthday</dt>
            <dd>{c.birthday}</dd>
          </dl>
        </section>
      </div>
    </div>
  );
}
