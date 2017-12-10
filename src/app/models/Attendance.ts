export interface Attendance {
    attendanceStartsAt: Date
    attendanceEndsAt: Date
    confirmedAt: Date
    attendantName: string
}

export interface NonAttendance {
    confirmedAt: Date
    nonAttendantName: string
}