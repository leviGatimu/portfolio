export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image: string;
  /**
   * Set to true only once this person has read the quote and said yes.
   * Unapproved quotes are drafts: they show in local development and never
   * appear on the live site.
   */
  approved: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "ibrahim",
    name: "Ibrahim Ngugi Gatimu",
    designation: "Client · Author of Zibrah Code",
    quote:
      "Levi built the Zibrah Code website and took real care in getting the ideas behind the book across. He listened closely and delivered a site I'm proud to send people to.",
    image: "/people/ibrahim.jpg",
    approved: false,
  },
  {
    id: "kenny",
    name: "Kenny Kelvin",
    designation: "Fellow developer",
    quote:
      "Levi is the developer who keeps going until something actually works. He learns fast, shares what he finds, and always cares about the details users notice.",
    image: "/people/kenny-portrait.jpg",
    approved: false,
  },
  {
    id: "eric",
    name: "Eric Tuyishimire",
    designation: "Instructor",
    quote:
      "Levi is the kind of student who doesn't stop at the assignment. Give him a problem and he comes back with something that works, along with a clear explanation of how he got there.",
    image: "/people/eric.jpg",
    approved: false,
  },
];
