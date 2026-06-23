"use client";

import { createContext, useContext, useState } from "react";

type ModalState = {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
};

type ContactModalContextValue = {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
  open: (content: React.ReactNode, title?: string) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({ isOpen: false, content: null });

  const open = (content: React.ReactNode, title?: string) =>
    setState({ isOpen: true, content, title });

  const close = () =>
    setState((s) => ({ ...s, isOpen: false }));

  return (
    <ContactModalContext.Provider value={{ ...state, open, close }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}
