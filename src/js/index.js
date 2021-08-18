import $ from "jquery";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import styles from "../css/style.css";

const sections = document.querySelectorAll(".section");
console.log(sections);

const slideIn = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.add("show");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(slideIn, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);

  section.classList.remove("show");
});

if (module.hot) {
  module.hot.accept(function (err) {
    console.log(err);
  });
}
