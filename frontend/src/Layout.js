/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <main className="w-full grid grid-rows-[auto_1fr_auto] gap-4">
      <header className="w-full flex items-center justify-between gap-4 h-[70px] px-6 border-slate-200 border-b">
        <Link to="/">
          <h1 className="text-2xl font-bold">Go Ecommerce</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/product">Products</Link>
          <a href="#" className="text-slate-500 hover:underline">
            About Us
          </a>
          <a href="#" className="text-slate-500 hover:underline">
            Contact Us
          </a>
        </nav>
      </header>
      <div className="w-full min-h-[80vh]">
        <Outlet />
      </div>
      <div className="w-full flex items-center justify-center gap-2 p-3">
        Copyright ©{" "}
        <a href="#" className="underline">
          Vickonary
        </a>{" "}
        {new Date().getFullYear()}
      </div>
    </main>
  );
}
