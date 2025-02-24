import Image from "next/image";

export default function Sidebar({ children }) {
  return (
    <aside className="drawer drawer-open sticky w-52">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side min-w-52">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base text-base-content min-h-full min-w-full p-4 gap-2">
          <Image
            className="w-full h-full object-contain mb-4"
            src="/logo.svg"
            alt="logo"
            height="1"
            width="1"
            priority
          />
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
          <button className="btn">Button</button>
        </ul>
      </div>
    </aside>
  );
}
