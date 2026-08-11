export default function CalendarVisual({ tone, compact = false, mark }: { tone: string; compact?: boolean; mark?: string }) {
  return (
    <div className={`calendar-visual ${tone} ${compact ? 'calendar-visual--compact' : ''}`}>
      <div className="calendar-ring ring-one" />
      <div className="calendar-ring ring-two" />
      <div className="calendar-paper">
        <div className="calendar-paper-top"><span>2025</span><span>{mark || 'JUN'}</span></div>
        <div className="calendar-art" />
        <div className="calendar-days">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`} className="calendar-day-label">{day}</span>)}
          {Array.from({ length: 21 }).map((_, index) => <span key={index} className={index === 9 ? 'calendar-day active' : 'calendar-day'}>{index + 1}</span>)}
        </div>
      </div>
    </div>
  )
}
