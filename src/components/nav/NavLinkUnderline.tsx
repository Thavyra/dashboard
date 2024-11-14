import NavLink, { NavLinkProps } from "./NavLink";

export default function NavLinkUnderline({className, activeClassName, inactiveClassName, ...props} : NavLinkProps) {
    return (
        <NavLink 
        className={`block transition pb-1 ${className}`}
        inactiveClassName={`text-link border-b-link-hover hover:text-link-hover hover:border-b-2 ${inactiveClassName}`}
        activeClassName={`border-b-2 border-b-light text-light ${activeClassName}`}
        {...props}/>
    )
}