'use client';

// client component 

import React, { ReactNode, useEffect, useState } from 'react';

export const RenderMounted = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <>{children}</>;
};

// Above, renderMonuted is setting a state for mounted 
// then uses useEffect to change the state 
// checks if mounted is false (then turns true) and vice versa 
// then returns children after mount 
// component helps with hydration between server and client side 
// ensures that component and children only renders on the client after mount