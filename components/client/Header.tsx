'use client'

import { useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { searchSite } from './search-data'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = searchSite(query)

  const openSearch = () => {
    setSearchOpen(true)
    setMenuOpen(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <a href="#top" className="logo" aria-label="Sen Tech home"><img src="/SenTech_Logo_Redrawn.png" alt="Sen Tech" /> Sen Tech</a>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#enquiry" onClick={() => setMenuOpen(false)}>Shop now</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search" onClick={openSearch}><Search /></button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-overlay">
          <div className="search-panel">
            <div className="search-bar">
              <Search aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calendars, planners, help…"
                aria-label="Search the site"
              />
              <button className="search-close" aria-label="Close search" onClick={closeSearch}><X /></button>
            </div>
            {query.trim() && (
              <div className="search-results">
                {results.length > 0 ? (
                  results.map((item) => (
                    <a key={item.title} href={item.href} className="search-result" onClick={closeSearch}>
                      <span className="search-result-title">{item.title}</span>
                      <span className="search-result-desc">{item.description}</span>
                    </a>
                  ))
                ) : (
                  <p className="search-empty">No results for “{query}”.</p>
                )}
              </div>
            )}
            {!query.trim() && (
              <p className="search-hint">Try “calendar”, “custom”, “family” or “contact”.</p>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
