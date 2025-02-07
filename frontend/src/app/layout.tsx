import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <html lang="en">
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </Fragment>
  );
}
