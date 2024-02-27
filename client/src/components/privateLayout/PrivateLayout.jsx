import React from "react";
import AppNav from "../AppNav";

export default function PrivateLayout({ children }) {
  return (
    <>
      <AppNav />
      <div>{children}</div>
    </>
  );
}
