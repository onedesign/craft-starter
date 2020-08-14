import gsap from "gsap";
import msg from "./modules/msg";

console.log("hello");

// Just to prove things are working
console.log(msg);

console.log("gsap", gsap);
gsap.to(".box", { rotation: 26 });
