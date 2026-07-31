"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

interface SavedContextType {
 savedOpt: string[];
 toggleSave: (id: string ) => void;
 clearSaved: () => void;
 isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | null>(null);

export const SavedProvider = ({children}: Props ) => {
  const [ savedOpt, setSavedOpt ] = useState<string[]>([]);

  const { data: session, status } = useSession();

  const storageKey = session?.user?.id ? `savedOpt:${session.user.id}` : null;

  useEffect(()=> {
    if(status === "loading") return;

    if(!storageKey) {
      setSavedOpt([]);
      return;
    }

   const savedData = localStorage.getItem(storageKey)
   setSavedOpt(savedData? JSON.parse(savedData) : []);
  },[storageKey, status])

  //Persist to the user's own key when the list changes
  useEffect(() => {
    if(!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(savedOpt));
  },[savedOpt, storageKey])

  const toggleSave =(id: string) => {
    if(!storageKey) return;
   setSavedOpt((prev) => 
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  }

  const clearSaved = () => {
    if(storageKey) localStorage.removeItem(storageKey);
    setSavedOpt([]);
  }

  const isSaved = (id: string) => savedOpt.includes(id);

  return(
    <SavedContext.Provider value={{ savedOpt, toggleSave, clearSaved, isSaved  }}>
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


