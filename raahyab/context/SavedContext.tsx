"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface SavedContextType {
 savedOpt: string[];
 toggleSave: (id: string ) => void;
}

const SavedContext = createContext<SavedContextType | null>(null);

export const SavedProvider = ({children}: Props ) => {
  const [ savedOpt, setSavedOpt ] = useState<string[]>([]);

  const toggleSave =((id: string) => {
   setSavedOpt((prev) => {
    if(prev.includes(id)) {
      return prev.filter((savedId) => savedId !== id)
    }
    return [...prev, id]
   })
  })

    useEffect(() => {
   const savedData = localStorage.getItem("savedOpt");
   if(savedData){
    setSavedOpt(JSON.parse(savedData))
   }
  },[])

  useEffect(() => {
   localStorage.setItem("savedOpt", JSON.stringify(savedOpt));
  },[savedOpt])


  return(
    <SavedContext.Provider value={{ savedOpt, toggleSave }}>
      { children}
    </SavedContext.Provider>
  )
}

export const useSaved = () => {
 const context = useContext(SavedContext);

 if(!context) {
  throw new Error("useSaved must be used within Saved Provider.")
 }

 return context
}


