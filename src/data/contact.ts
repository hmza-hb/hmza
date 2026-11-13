export const CONTACT_EMAIL = "hello@hmza.cc";

export type ContactChannel = {
  id: string;
  label: string;
  handle: string;
  href: string;
  hint: string;
};

export const contactChannels: ContactChannel[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@hamza.hafeez82",
    href: "https://instagram.com/hamza.hafeez82",
    hint: "DMs open for quick notes and intros",
  },
  {
    id: "x",
    label: "X",
    handle: "@hmza_hb",
    href: "https://x.com/hmza_hb",
    hint: "Public updates and direct messages",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/hmza-hb",
    href: "https://www.linkedin.com/in/hmza-hb",
    hint: "Collaborations, labs, and engineering work",
  },
];

export const contactIntro =
  "Questions about the lab, collaborations, or something you are building: email is best for detail. For a faster ping, send a DM on any of the channels below.";
