import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Works",
    href: "#works",
  },
  {
    name: "Blog",
    href: "#blog",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isOpendPage, setIsOpenedPage] = useState("Home");
  return (
    <Disclosure
      as="nav"
      className="bg-[var(--color-brand-header-bg)] border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-violet-400 hover:bg-violet-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Sabeer C A"
                src="/icons/logo.svg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:ml-auto md:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpenedPage(item.name)}
                    aria-current={
                      item.name === isOpendPage ? "page" : undefined
                    }
                    className={classNames(
                      item.name === isOpendPage
                        ? "text-yellow-300"
                        : "text-violet-300 hover:text-yellow-300",
                      "rounded-md px-3 py-2 text-sm font-bold"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => setIsOpenedPage(item.name)}
              aria-current={item.name === isOpendPage ? "page" : undefined}
              className={classNames(
                item.name === isOpendPage
                  ? "text-yellow-300"
                  : "text-violet-300 hover:text-yellow-300",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
