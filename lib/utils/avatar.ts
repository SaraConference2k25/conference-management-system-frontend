/**
 * Generate initials from a full name or email
 */
export function getInitials(name: string, email?: string): string {
  if (!name) {
    name = email || 'U'
  }

  // If it's an email, try to extract something meaningful
  if (name.includes('@')) {
    const localPart = name.split('@')[0]
    // Try to extract initials from email local part
    const parts = localPart.split(/[._-]/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return localPart.substring(0, 2).toUpperCase()
  }

  // Split by spaces and get first letters
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  // Single word - get first two letters
  return name.substring(0, 2).toUpperCase()
}

/**
 * Get display name - prefer full name over email
 */
export function getDisplayName(fullName?: string, email?: string): string {
  return fullName && fullName.trim() ? fullName : email || 'Participant'
}
