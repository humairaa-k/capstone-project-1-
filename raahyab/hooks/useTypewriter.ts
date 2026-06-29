import { useEffect, useState } from "react";

const words = [
  "Remote Jobs",
  "Internships",
  "Scholarships",
  "Online Courses",
  "Volunteering",
  "Training Programs",
];

export function useTypewriter() {
 const [ displayed, setDisplayed ] = useState("");
 const [ wordIndex, setWordIndex ] = useState(0);
 const [ isDeleting, setIsDeleting ] = useState(false);


 useEffect(() => {
   const currentWord = words[wordIndex];
   const speed = isDeleting ? 50 : 85 

 const timeout = setTimeout(() => {
    if(!isDeleting) {
    const next = currentWord.slice(0, displayed.length + 1 )
    setDisplayed(next)

    if(next == currentWord) {
      setTimeout(() => {
       setIsDeleting(true)
      }, 1500);
     }
    } else {
      const next = currentWord.slice(0, displayed.length - 1);
      setDisplayed(next);

      if(next === "") {
        setIsDeleting(false)
        setWordIndex((prev) => ( prev + 1)%words.length);
      }
    }
 }, speed)

 return () => clearTimeout(timeout)
 },[displayed, wordIndex, isDeleting])

 return { displayed }
 
}