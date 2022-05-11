import Link from "next/link";
import LoginBtn from "./LoginBtn";
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.header}>
      <ul className={`main-nav`}>
        <li>
          <Link href='/'><a>Home</a></Link>
        </li>
        <li>
          <Link></Link>
        </li>
      </ul>
    </nav>
  )
}