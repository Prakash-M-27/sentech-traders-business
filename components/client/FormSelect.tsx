'use client'

import { SelectHTMLAttributes, forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
  icon: ReactNode
  index?: number
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, required, options, placeholder = 'Choose Calendar Type', icon, index = 0, id, className = '', ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <motion.div
        className="eq-field"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <label htmlFor={selectId} className="eq-label">
          {label}
          {required && <span className="eq-required" aria-label="required">*</span>}
        </label>
        <div className="eq-input-wrapper">
          <span className="eq-input-icon" aria-hidden="true">{icon}</span>
          <select
            ref={ref}
            id={selectId}
            className={`eq-select eq-input--with-icon ${error ? 'eq-input--error' : ''} ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...props}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg className="eq-select-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {error && (
          <span id={`${selectId}-error`} className="eq-error" role="alert">
            {error}
          </span>
        )}
      </motion.div>
    )
  }
)

FormSelect.displayName = 'FormSelect'

export default FormSelect
