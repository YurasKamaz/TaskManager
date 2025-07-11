export const categoryToKind = {
    Bug: 'danger',
    Feature: 'success',
    Documentation: 'primary',
    Refactor: 'warning',
    Test: 'neutral'
} as const

export const statusToKind = {
    'To Do': 'danger',
    'In Progress': 'warning',
    'Done': 'success'
} as const

export const priorityToKind = {
    Low: 'success',
    Medium: 'warning',
    High: 'danger'
} as const