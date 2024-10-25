import { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <main className="w-full flex items-center justify-center">
        {children}
      </main>
    </Suspense>
  );
};

export default AuthLayout;
