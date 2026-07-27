import { useEffect, useState } from "react";


export function useTypewriter(words:string[]) {
 const [ displayed, setDisplayed ] = useState("");
 const [ wordIndex, setWordIndex ] = useState(0);
 const [ isDeleting, setIsDeleting ] = useState(false);

 useEffect(() => {
    setDisplayed("");
    setWordIndex(0);
    setIsDeleting(false);
  }, [words]);

 useEffect(() => {
   const currentWord = words[wordIndex] ?? "";
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