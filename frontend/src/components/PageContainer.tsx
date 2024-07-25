import { ReactNode } from "react";

interface PageContainerProps {
  style: string;
  children?: ReactNode;
}

export default function PageContainer({ style, children }: PageContainerProps) {
  return (
    <div className={`page-container h-[100dvh] w-screen bg-black ${style}`}>
      {children}
    </div>
  );
}
