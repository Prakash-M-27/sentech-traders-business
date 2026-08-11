'use client'

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
  icon: ReactNode
  index?: number
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, icon, index = 0, id, className = '', ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="eq-field">
        <label htmlFor={inputId} className="eq-label">
          {label}
          {required && <span className="eq-required" aria-label="required">*</span>}
        </label>
        <div className="eq-input-wrapper">
          <span className="eq-input-icon" aria-hidden="true">{icon}</span>
          <input
            ref={ref}
            id={inputId}
            className={`eq-input eq-input--with-icon ${error ? 'eq-input--error' : ''} ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <span id={`${inputId}-error`} className="eq-error" role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
