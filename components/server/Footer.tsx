export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#top" className="logo"><img src="/SenTech_Logo_Redrawn.png" alt="Sen Tech" /> Sen Tech</a>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <a href="#shop">Shop all</a>
            <a href="#categories">Collections</a>
            <a href="#about">Our story</a>
          </div>
          <div>
            <strong>Contact</strong>
            <a href="#top" className="address-word">Address</a>
            <a href="#top">1, Thendral Nagar South,</a>
            <a href="#top">Olaiyur Main Road,</a>
            <a href="#top">K.K.Nagar,</a>
            <a href="#top">Trichy 620021,</a>
            <a href="#top">Tamil Nadu</a>
            <a href="tel:8608059455">Phone: 8608059455</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#top">Accessibility</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sen Tech. All rights reserved.</span>
        <span>Have a great day !</span>
      </div>
    </footer>
  )
}
