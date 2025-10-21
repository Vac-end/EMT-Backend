export interface CourseSummary {
  id: string;
  tittle: string;
  coverImageUrl: string;
  academicLevelName: string;
}
export interface StudentDashboardCourse {
  enrollmentId: string | null;
  course: CourseSummary;
  resolvedAcademicLevel: string;
  resolvedTeacher: string;
  resolvedEnrollmentCount: number;
  completionPercentage: number;
  newAnnouncementsCount: number;
}

export interface PaginatedDashboardResponse {
  totalItems: number;
  courses: StudentDashboardCourse[];
  totalPages: number;
  currentPage: number;
}