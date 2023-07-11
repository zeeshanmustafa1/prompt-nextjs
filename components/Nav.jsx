"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";

import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(null)

  useEffect(() => {
    const providers = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    providers()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/">
        <Image src="/assets/images/logo.svg" alt="logo" className="object-contain" width={30} height={30}/>
        <p className="logo_text">Promptopia</p>
      </Link>

      {/*desktop nav*/}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>


            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src="/assets/images/logo.svg" alt="profile" className="rounded-full" width={37} height={37}/>
            </Link>

          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/*mobile nav */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image src="/assets/images/logo.svg" alt="profile" className="rounded-full" width={37} height={37}
                   onClick={
                     () => setToggleDropDown(
                       (prev) => !prev
                     )
                   }
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link href="/create-profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <button type="button" className="mt-5 w-full black_btn" onClick={()=>{
                  setToggleDropDown(false);
                  signOut();
                }}>
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}

      </div>
    </nav>
  );
};

export default Nav;