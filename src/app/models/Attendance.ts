export interface Attendance {
    attendanceStartsAt?: Date
    attendanceEndsAt?: Date
    confirmedAt: Date
    attendantName?: string
    nonAttendantName?: string
    present: boolean
}