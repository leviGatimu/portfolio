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
    approved: true,
  },
  {
    id: "kenny",
    name: "Kenny Kelvin",
    designation: "Fellow developer",
    quote:
      "Levi is the developer who keeps going until something actually works. He learns fast, shares what he finds, and always cares about the details users notice.",
    image: "/people/kenny-portrait.jpg",
    approved: true,
  },
  {
    id: "eric",
    name: "Eric Tuyishimire",
    designation: "Instructor",
    quote:
      "Levi is the kind of developer who doesn't stop at the assignment. Give him a problem and he comes back with something that works, along with a clear explanation of how he got there.",
    image: "/people/eric.jpg",
    approved: true,
  },
  {
    id: "alpha",
    name: "Alpha Mugisha",
    designation: "Collaborator on Tembera Rwanda and RwaSport",
    quote:
      "I've had the opportunity to work with Levi on projects like Tembera Rwanda and RwaSport, and I can confidently say he's a hardworking, dedicated, and passionate developer. He's always willing to learn, take on challenges, and turn ideas into something meaningful. Working alongside him has shown me his commitment to delivering quality work, his problem-solving mindset, and his ability to collaborate effectively. He's definitely someone I'd be happy to work with on future projects.",
    image: "/people/alpha.jpg",
    approved: true,
  },
];
