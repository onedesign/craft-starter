import gsap from "gsap";
import msg from "./modules/msg";

// eslint-disable-next-line no-console
console.log("hello");

// Just to prove things are working
// eslint-disable-next-line no-console
console.log(msg);

// eslint-disable-next-line no-console
console.log("gsap", gsap);
gsap.to(".box", { rotation: 26 });
