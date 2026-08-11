'use client'

import { TextareaHTMLAttributes, forwardRef, ReactNode } from 'react'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  required?: boolean
  icon: ReactNode
  index?: number
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, icon, index = 0, id, className = '', ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="eq-field eq-field--full">
        <label htmlFor={textareaId} className="eq-label">
          {label}
          {required && <span className="eq-required" aria-label="required">*</span>}
        </label>
        <div className="eq-textarea-wrapper">
          <span className="eq-textarea-icon" aria-hidden="true">{icon}</span>
          <textarea
            ref={ref}
            id={textareaId}
            className={`eq-textarea ${error ? 'eq-input--error' : ''} ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <span id={`${textareaId}-error`} className="eq-error" role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

export default FormTextarea
