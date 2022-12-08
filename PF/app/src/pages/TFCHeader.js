import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Avatar from "./AvatarDropBox.js";
import useAnimatedNavToggler from "../helpers/useAnimatedNavToggler.js";
// import { refreshAvatarFn } from "../../scripts/user_status.js"

import logo from "../images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`
  flex justify-between items-center
   mx-auto max-w-[80%] 

`;

export const NavLinks = tw.div`inline-block`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hocus:no-underline hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between no-underline`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({ }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const user_url = localStorage.getItem('user_url');
    if (user_url && user_url !== 'undefined') {
      setIsLoggedIn(true);
      fetch(user_url, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setAvatar(data['avatar']);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const defaultLinks = [
    <>
      <NavLinks key={1}>
        <NavLink href="/studios">Find a Studio</NavLink>
        <NavLink href="/classes">Find a Class</NavLink>
        <NavLink href="/plans">Our Plans</NavLink>
      </NavLinks>
      <NavLinks key={2}>
        {isLoggedIn ? (
          <Avatar url={avatar} />
        ) : (
          <>
            <NavLink href="/login" tw="lg:ml-12!">
              Login
            </NavLink>
            <PrimaryLink css={tw`rounded-full`} href="/signup">
              Sign Up
            </PrimaryLink>
          </>
        )}
      </NavLinks>
    </>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap["xl"];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      Toronto Fitness Club
    </LogoLink>
  );


  return (
    <>
      <Header className={"header-light"}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {defaultLogoLink}
          {defaultLinks}
        </DesktopNavLinks>

        <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
          {defaultLogoLink}
          <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
            {defaultLinks}
          </MobileNavLinks>
          <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
            {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
          </NavToggle>
        </MobileNavLinksContainer>
      </Header>
    </>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
