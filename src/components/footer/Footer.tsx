import './Footer.scss'

type FooterProps = {
  siteTitle: string
}

export function Footer({ siteTitle }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p className="site-footer__note">
        © {year} {siteTitle}
      </p>
    </footer>
  )
}
