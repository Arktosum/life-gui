import React from "react";

export default function PageScreen({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-black overflow-hidden p-4 flex flex-col">
      {children}
    </div>
  );
}
